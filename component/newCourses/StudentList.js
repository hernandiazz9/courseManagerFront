import React from "react";
import { useQuery, gql } from "@apollo/client";
import Select from "react-select";

const GET_STUDENTLIST = gql`
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

const StudentList = ({ setStudentList, studentList }) => {
  const { data, loading } = useQuery(GET_STUDENTLIST);

  return (
    <div className="mb-4">
      <label
        htmlFor="studentList"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Start Time
      </label>
      <Select
        value={studentList}
        id="long-value-select"
        instanceId="long-value-select"
        options={!loading && data.getStudentlists}
        onChange={(studentList) => setStudentList(studentList)}
        getOptionValue={(studentList) => studentList.id}
        getOptionLabel={(studentList) => studentList.listName}
        placeholder="Select Student List"
        noOptionsMessage={() => "No Data, create an Student List first "}
      />
    </div>
  );
};

export default StudentList;
