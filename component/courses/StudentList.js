import React, { useState } from "react";
import { Collapse } from "react-collapse";

const Students = ({ course }) => {
  const [open, setOpen] = useState(false);

  return Object.keys(course).length > 0 ? (
    <div className=" text-md font-bold text-gray-600">
      <button
        onClick={() => setOpen((open) => !open)}
        className=" text-sm font-light text-gray-500"
      >
        <span className=" text-md font-bold text-gray-600">
          <span className=" text-sm font-light text-gray-500">
            Student List:{" "}
          </span>
          {course.studentList && course.studentList.listName}
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
        <ul style={{ height: "100" }} className="pl-5">
          {course.studentList &&
            course.studentList.students.map((student) => (
              <li
                className="font-light divide-y divide-dashed"
                key={student.id}
              >
                {" "}
                - {student.name} {student.lastName}
              </li>
            ))}
        </ul>
      </Collapse>
      <style jsx>{`
        .ReactCollapse--collapse {
          color: blue;
        }
      `}</style>
    </div>
  ) : (
    "loading..."
  );
};

export default Students;
