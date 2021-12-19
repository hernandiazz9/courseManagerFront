import React, { useState } from "react";
import Layout from "../component/Layout";
import ExistinStudentList from "../component/studentList/ExistinStudentList";
import NewStudentList from "../component/studentList/NewStudentList";
import { useMutation, gql } from "@apollo/client";
import Swal from "sweetalert2";

const EDIT_STUDENT_LIST = gql`
  mutation EditStudentList($editStudentListId: ID!, $input: StudentListInput) {
    editStudentList(id: $editStudentListId, input: $input) {
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

const Newstudentlist = () => {
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [listName, setListName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedList, setSelectedList] = useState({
    id: "",
  });

  const handleClick = (list) => {
    setSelectedStudent(list.students);
    setListName(list.listName);
    setIsEditing(true);
    setSelectedList(list);
  };
  const [editStudentList] = useMutation(EDIT_STUDENT_LIST);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await editStudentList({
        variables: {
          editStudentListId: selectedList.id,
          input: {
            listName,
            students: selectedStudent.map((st) => st.id),
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
    Swal.fire("Edited", "List Edited succesfully", "success");
    setSelectedStudent([]);
    setListName("");
    setIsEditing(false)
  };
  return (
    <Layout>
      <h1 className="text-4xl my-6  text-center hidden md:block leading-6 font-medium text-black">
        Student List
      </h1>
      <div className="flex flex-col xl:flex-row justify-around ">
        <div className="w-full max-w-lg mr-3">
          <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            <ExistinStudentList handleClick={handleClick} />
          </div>
        </div>
        <div className="w-full max-w-lg">
          <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            <NewStudentList
              handleEdit={handleEdit}
              isEditing={isEditing}
              setSelectedStudent={setSelectedStudent}
              selectedStudent={selectedStudent}
              setListName={setListName}
              listName={listName}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Newstudentlist;
