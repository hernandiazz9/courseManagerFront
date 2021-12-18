import React from "react";
import { useQuery, gql } from "@apollo/client";
import Edit from "../courses/Edit";

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
    <>
      <h1 className="text-2xl text-center  leading-5 font-medium text-black">
        Student List
      </h1>
      <div className="bg-white mt-2 shadow overflow-hidden sm:rounded-md">
        <div className="divide-y divide-gray-300 p-5  py-2  tracking-wider">
          {!loading &&
            data.getStudentlists.map((list) => (
              <div
                className="block py-2 hover:bg-gray-50 tracking-wider hover:bg-gray-50"
                key={list.id}
              >
                <div className="flex flex-col md:flex-row  justify-between">
                  <div>
                    <p className="text-md md:text-xl font-bold uppercase  text-gray-800 truncate">
                      <span className=" capitalize text-sm font-light text-gray-500">
                        List name:{" "}
                      </span>
                      {list.listName}
                    </p>

                    <ul className="mt-2 flex flex-col">
                      {list.students.map((student, i) => (
                        <li key={student.id}>
                          <p className=" text-md font-bold text-gray-600">
                            <span className=" text-sm font-light text-gray-500">
                              Student {i + 1}:{" "}
                            </span>
                            {student.name}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="ml-2 sm:mt-4 pt-5 flex-shrink-0 flex flex-row md:flex-col">
                    <Edit edit={list} ur="editstudentlist" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ExistinStudentList;
