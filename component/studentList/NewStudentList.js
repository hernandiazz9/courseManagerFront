import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useQuery, gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";

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
const NEW_STUDENT_LIST = gql`
  mutation NewStudentList($input: StudentListInput) {
    newStudentList(input: $input) {
      id
      listName
      id
      students {
        name
        lastName
        email
        id
      }
    }
  }
`;

const NewStudentList = ({
  setSelectedStudent,
  selectedStudent,
  listName,
  setListName,
  handleEdit,
  isEditing,
}) => {
  const [students, setStudents] = useState([]);

  const { data, loading } = useQuery(GET_STUDENTS);
  if (!loading && students.length === 0) setStudents(data.getStudents);
  const [newStudentList] = useMutation(NEW_STUDENT_LIST, {
    update(cache, { data: { newStudentList } }) {
      const { getStudentlists } = cache.readQuery({ query: GET_STUDENT_LIST });
      cache.writeQuery({
        query: GET_STUDENT_LIST,
        data: {
          getStudentlists: [...getStudentlists, newStudentList],
        },
      });
    },
  });

  const selectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newStudentList({
        variables: {
          input: {
            listName,
            students: selectedStudent.map((st) => st.id),
          },
        },
      });
      Swal.fire("Added", "List Created succesfully", "success");
      setSelectedStudent([]);
      setListName("");
    } catch (error) {
      console.log(error, "Error");
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-center  leading-5 font-medium text-black">
        {isEditing?"Edit Student List":"New Student List"}
      </h1>

      <form
        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
        onSubmit={isEditing ? handleEdit : handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="listName"
            className="block text-gray-700 text-md font-bold mb-2"
          >
            List Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            onChange={(e) => setListName(e.target.value)}
            value={listName}
            placeholder="List Name"
            id="listName"
            placeholder="Student Name.."
            required
          />
        </div>
        <Select
          id="long-value-select"
          instanceId="long-value-select"
          value={selectedStudent}
          options={students.length > 0 && students}
          isMulti={true}
          onChange={(student) => selectStudent(student)}
          getOptionValue={(student) => student.id}
          getOptionLabel={(student) => student.name + " " + student.lastName}
          placeholder="Select Students"
          noOptionsMessage={() => "No Student"}
        />
        <input
          className="bg-gray-700 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
          type="submit"
          value={isEditing ? "Edit List" : "Create List"}
        />
      </form>
    </div>
  );
};

export default NewStudentList;
