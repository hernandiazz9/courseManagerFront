import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Swal from "sweetalert2";

const DELETE_STUDENTS = gql`
  mutation DeleteStudent($deleteStudentId: ID!) {
    deleteStudent(id: $deleteStudentId)
  }
`;
const GET_STUDENTS = gql`
  query GetStudents {
    getStudents {
      id
      email
      name
      lastName
    }
  }
`;
const Delete = ({ id }) => {
  const [deleteStudent] = useMutation(DELETE_STUDENTS, {
    update(cache) {
      const { getStudents } = cache.readQuery({ query: GET_STUDENTS });
      cache.writeQuery({
        query: GET_STUDENTS,
        data: {
          getStudents: getStudents.filter((course) => course.id !== id),
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
          const { data } = await deleteStudent({
            variables: {
              deleteStudentId: id,
            },
          });
          console.log(data.deleteCourse);
          Swal.fire("Deleted!", data.deleteStudent, "success");
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
