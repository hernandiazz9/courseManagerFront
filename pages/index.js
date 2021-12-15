import React from "react";
import Layout from "../component/Layout";
import { useQuery, gql } from "@apollo/client";

const COURSES = gql`
  query GetCourses {
    getCourses {
      id
      title
      startDate
      studentList
      startTime
      courseLength
      instructor
    }
  }
`;

const Courses = () => {
  const { data, loading } = useQuery(COURSES);
  console.log(data);
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 pb-5 font-light">Courses</h1>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="sm:px-2 md:px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="sm:px-2 md:px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Start
                      </th>
                      <th
                        scope="col"
                        className="sm:px-2 md:px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Length
                      </th>
                      <th
                        scope="col"
                        className="sm:px-2 md:px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                      >
                        Instructor
                      </th>
                      <th
                        scope="col"
                        className="sm:px-1 md:px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Students
                      </th>
                      <th scope="col" className="relative  py-3">
                        <span className="sr-only">edit-delet</span>
                      </th>
                      {/* <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Delete</span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {!loading &&
                      data.getCourses.map((course) => (
                        <tr key={course.id}>
                          <td className="sm:px-1 md:px-3 xl:px-6 py-4 whitespace-wrap text-sm text-black-800">
                            {course.title}
                          </td>
                          <td className="sm:px-1 md:px-3 xl:px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {/* {course.startDate} */}
                              12/10/2021
                            </div>
                            <div className="text-sm text-gray-500">
                              {course.startTime}
                            </div>
                          </td>
                          <td className="sm:px-1 md:px-3 xl:px-6 py-4 whitespace-nowrap">
                            <span className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {course.courseLength}
                            </span>
                          </td>
                          <td className="sm:px-1 md:px-3 xl:px-6 py-4 whitespace-wrap  text-sm text-black-800">
                            {/* {course.instructor}
                             */}
                            hernan diaz
                          </td>
                          <td className="sm:px-1 md:px-3 xl:px-6 py-4 whitespace-wrap  text-sm text-black-800">
                            {/* {course.studentList} */}
                            juan carlos
                          </td>
                          <td className="sm:px-1 md:px-3 xl:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex md:justify-between sm:flex-col xl:flex-row ">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                L
                              </a>
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                X
                              </a>
                            </div>
                          </td>
                          {/* <td className="sm:px-1 md:px-3 xl:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              X
                            </a>
                          </td> */}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className='bg-gray-700'>
            <tr className="text-white">
              <th className="w-1/6 py-2 ">Title</th>
              <th className="w-1/6 py-2 ">Start Date</th>
              <th className="w-1/6 py-2 ">Start Time</th>
              <th className="w-1/6 py-2 ">Course Length</th>
              <th className="w-1/6 py-2 ">Instructor</th>
              <th className="w-1/6 py-2 ">Students</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {!loading&&data.getCourses.map(course=>(
              <tr key={course.id}>
                <td className="border px-4 py-2">{course.title}</td>
                <td className="border px-4 py-2">{course.startDate}</td>
                <td className="border px-4 py-2">{course.startTime}</td>
                <td className="border px-4 py-2">{course.courseLength}</td>
                <td className="border px-4 py-2">{course.instructor}</td>
                <td className="border px-4 py-2">{course.studentList}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </Layout>
    </div>
  );
};

export default Courses;
