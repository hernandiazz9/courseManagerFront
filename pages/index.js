import React from "react";
import Layout from "../component/Layout";
import { useQuery, gql } from "@apollo/client";
import Date from "../component/courses/Date";
import Instructor from "../component/courses/Instructor";
import StudentList from "../component/courses/StudentList";
import Edit from "../component/courses/Edit";
import Delete from "../component/courses/Delete";
import Link from "next/link";

const GET_COURSES = gql`
  query GetCourses {
    getCourses {
      id
      title
      startDate
      startTime
      courseLength
      instructor {
        id
        name
        lastName
        email
      }
      studentList {
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
  }
`;

const Courses = () => {
  const { data, loading } = useQuery(GET_COURSES);
  console.log(data);

  return (
    <Layout>
      <h1 className="text-4xl mt-4 text-center hidden md:block leading-6 font-medium text-black">
        Courses
      </h1>

      <Link href="/newcourse">
        <a className="bg-blue-700 px-3 py-2 md:px-5 mt-6 inline-block text-white rounded text-sm uppercase hover:bg-gray-700 font-bold mb-4 md:mb-10">
          New Course
        </a>
      </Link>
      <div className="bg-white mt-2 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-300">
          {!loading &&
            data.getCourses.map((course) => (
              <li key={course.id}>
                <div className="block py-2 hover:bg-gray-50 tracking-wider">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <div>
                        <p className="text-md md:text-xl font-bold uppercase  text-gray-700 truncate">
                          {course.title}
                        </p>
                        <Date course={course} />
                        <Instructor course={course} />
                        <StudentList course={course} />
                      </div>
                      <div className="ml-2 sm:mt-4 pt-5 flex-shrink-0 flex flex-row md:flex-col">
                        <Edit edit={course} url="editcourse" />
                        <Delete id={course.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Courses;
