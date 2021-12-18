import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { useQuery, gql } from "@apollo/client";
import Course from "./Course";

const GET_COURSE_BY_INSTRUCTOR = gql`
  query GetCourseByInstructor($getCourseByInstructorId: ID!) {
    getCourseByInstructor(id: $getCourseByInstructorId) {
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
const CoursesInstructor = ({ instructor }) => {
  const [open, setOpen] = useState(false);
  const { data, loading } = useQuery(GET_COURSE_BY_INSTRUCTOR, {
    variables: {
      getCourseByInstructorId: instructor.id,
    },
  });
  console.log(
    !loading &&
      data.getCourseByInstructor.length > 0 &&
      data.getCourseByInstructor
  );

  return (
    <div className=" text-md font-bold text-gray-600">
      <button
        onClick={() => setOpen((open) => !open)}
        className="text-sm font-light text-gray-500"
      >
        <span className=" text-md font-bold text-gray-600">
          <span className=" text-sm font-light text-gray-500">
            Courses Asigned:{" "}
          </span>
          {!loading && data.getCourseByInstructor.length}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 ml-4 inline-block w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
          />
        </svg>
      </button>
      <Collapse
        isOpened={open}
        initialStyle={{ height: 0, transition: "height .5s " }}
      >
        <ul
          style={{ height: "100" }}
          className=" divide-y divide-gray-200 pl-5 "
        >
          {!loading &&
            data.getCourseByInstructor.map((course) => (
              <li key={course.id}>{ <Course course={course} /> }</li>
            ))}
        </ul>
      </Collapse>
      <style jsx>{`
        .ReactCollapse--collapse {
          color: blue;
        }
      `}</style>
    </div>
  );
};

export default CoursesInstructor;
