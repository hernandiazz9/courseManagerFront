import React from "react";
import { useQuery, gql } from "@apollo/client";

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

const ExistinStudentList = () => {
  const { data, loading } = useQuery(GET_STUDENT_LIST);
  //   console.log(data);
  return (
    <div>
      {!loading &&
        data.getStudentlists.map((list) => (
          <div className="border" key={list.id}>
            <h3>{list.listName}</h3>
            <ul>
              {list.students.map((student) => (
                <li key={student.id}>{student.name}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default ExistinStudentList;
