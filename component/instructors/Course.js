import React from "react";
import Edit from "../courses/Edit";
import Delete from "../courses/Delete";
import Dates from "../courses/Dates";
import Students from "../courses/StudentList";

const Course = ({ course }) => {
  console.log(course);
  return (
    <div className="block py-2 hover:bg-gray-50 tracking-wide">
      <div className="px-1 py-1 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <p className="text-md font-bold   text-gray-700 truncate">
              <span className=" text-sm  font-light text-gray-500">
                Title:{" "}
              </span>
              {course.title}
            </p>
            <Dates course={course}/>
            <Students course={course} />
          </div>
          <div className="ml-2  flex-shrink-0 flex flex-row md:flex-col">
          <Edit edit={course} url='editcourse'  />
          <Delete id={course.id} />

          </div>

        </div>
      </div>
    </div>
  );
};

export default Course;
