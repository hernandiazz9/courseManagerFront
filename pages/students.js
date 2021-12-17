import React from "react";
import Layout from "../component/Layout";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import Edit from "../component/courses/Edit";
import Delete from "../component/students/Delete";


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

const Students = () => {
  const { data, loading } = useQuery(GET_STUDENTS);

  return (
    <div>
      <Layout>
        <h1 className="text-4xl mt-4 text-center hidden md:block leading-6 font-medium text-black">
          Students
        </h1>

        <Link href="/newstudent">
          <a className="bg-blue-700 px-3 py-2 md:px-5 mt-6 inline-block text-white rounded text-sm uppercase hover:bg-gray-700 font-bold mb-4 md:mb-10">
            Add Students
          </a>
        </Link>
        <Link href="/studentlist">
          <a className="bg-blue-700 ml-3 px-3 py-2 md:px-5 mt-6 inline-block text-white rounded text-sm uppercase hover:bg-gray-700 font-bold mb-4 md:mb-10">
            Student List
          </a>
        </Link>

        <div className="bg-white mt-2 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-300">
            {!loading &&
              data.getStudents.map((student) => (
                <li key={student.id}>
                  <div className="block py-2 hover:bg-gray-50 tracking-wider">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex flex-col md:flex-row items-center justify-between">
                        <div>
                          <p className="text-sm md:text-xl font-bold uppercase  text-gray-700 truncate">
                            <span className=" capitalize text-sm font-light text-gray-500">
                              Fullname:{" "}
                            </span>
                            {student.name} {student.lastName}
                          </p>
                          <p className=" text-md font-bold text-gray-600">
                            <span className=" text-sm font-light text-gray-500">
                              Email:{" "}
                            </span>
                            {student.email}
                          </p>
                          {/* <CoursesInstructor student={student} /> */}
                        </div>
                        <div className=" divider-y ml-2 sm:mt-4 pt-5 flex-shrink-0 flex flex-row md:flex-col">
                          <Edit edit={student} url="editstudent" />
                          <Delete id={student.id} />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </Layout>
    </div>
  );
};

export default Students;
