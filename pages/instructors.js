import React from "react";
import Layout from "../component/Layout";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import Edit from "../component/courses/Edit";
import Delete from "../component/instructors/Delete";
import CoursesInstructor from "../component/instructors/CoursesInstructor";

const GET_INSTRUCTORS = gql`
  query GetInstructors {
    getInstructors {
      id
      email
      name
      lastName
    }
  }
`;

const Instructors = () => {
  const { data, loading } = useQuery(GET_INSTRUCTORS);


  return (
    <div>
      <Layout>
        <h1 className="text-4xl mt-4 text-center hidden md:block leading-6 font-medium text-black">
          Instructors
        </h1>

        <Link href="/newinstructor">
          <a className="bg-blue-700 px-3 py-2 md:px-5 mt-6 inline-block text-white rounded text-sm uppercase hover:bg-gray-700 font-bold mb-4 md:mb-10">
            Add Instructor
          </a>
        </Link>

        <div className="bg-white mt-2 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-300">
            {!loading &&
              data.getInstructors.map((instructor) => (
                <li key={instructor.id}>
                  <div className="block py-2 hover:bg-gray-50 tracking-wider">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex flex-col md:flex-row items-center justify-between">
                        <div>
                          <p className="text-sm md:text-xl font-bold uppercase  text-gray-700 truncate">
                            <span className=" lowercase text-sm font-light text-gray-500">
                              Fullname:{" "}
                            </span>
                            {instructor.name} {instructor.lastName}
                          </p>
                          <p className=" text-md font-bold text-gray-600">
                            <span className=" text-sm font-light text-gray-500">
                              Email:{" "}
                            </span>
                            {instructor.email}
                          </p>
                          <CoursesInstructor instructor={instructor} />
                        </div>
                        <div className=" divider-y ml-2 sm:mt-4 pt-5 flex-shrink-0 flex flex-row md:flex-col">
                          <Edit edit={instructor} url="editinstructor" />
                          <Delete id={instructor.id} />
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

export default Instructors;
