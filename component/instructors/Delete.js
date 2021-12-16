import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Swal from "sweetalert2";

const DELETE_COURSE = gql`
  mutation DeleteInstructor($deleteInstructorId: ID!) {
  deleteInstructor(id: $deleteInstructorId)
}
`;
const GET_INSTRUCTOR = gql`
  query GetInstructors {
    getInstructors {
      id
      email
      name
      lastName
    }
  }
`;
const Delete = ({ id }) => {
  const [deleteInstructor] = useMutation(DELETE_COURSE, {
    update(cache) {
      const { getInstructors } = cache.readQuery({ query: GET_INSTRUCTOR });
      cache.writeQuery({
        query: GET_INSTRUCTOR,
        data: {
          getInstructors: getInstructors.filter((course) => course.id !== id),
        },
      });
    },
  });

  const handleClick = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await deleteInstructor({
            variables: {
              deleteInstructorId: id,
            },
          });
          console.log(data.deleteCourse);
          Swal.fire("Deleted!", data.deleteInstructor, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  return (
    <button type="button" onClick={handleClick}>
      <p className="px-2 ml-2 text-center inline-flex text-xs leading-5 font-semibold uppercase rounded-full bg-red-100 text-green-800">
        delete
      </p>
    </button>
  );
};

export default Delete;
