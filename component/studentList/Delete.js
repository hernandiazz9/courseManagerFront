import React from "react";
import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";

const GET_STUDENT_LIST = gql`
  query GetStudentlists {
    getStudentlists {
      id
      listName
      students {
        id
        name
        lastName
        email
      }
    }
  }
`;
const DELETE_STUDENT_LIST = gql`
  mutation DeleteStudentList($deleteStudentListId: ID!) {
    deleteStudentList(id: $deleteStudentListId)
  }
`;

const Delete = ({ id }) => {
  const [deleteStudentList] = useMutation(DELETE_STUDENT_LIST, {
    update(cache) {
      const { getStudentlists } = cache.readQuery({ query: GET_STUDENT_LIST });
      cache.writeQuery({
        query: GET_STUDENT_LIST,
        data: {
          getStudentlists: getStudentlists.filter((list) => list.id !== id),
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
           const { data } = await deleteStudentList({
             variables: {
               deleteStudentListId: id,
             },
           });
           console.log(data.deleteStudentList);
           Swal.fire("Deleted!", data.deleteStudentList, "success");
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
