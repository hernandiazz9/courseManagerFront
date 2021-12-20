import React from "react";
import Dates from "../courses/Dates";
import Delete from "../courses/Delete";
import Edit from "../courses/Edit";
import Instructor from "../courses/Instructor";
import StudentList from "../courses/StudentList";

const CourseByDate = ({ courses }) => {
  return (
    <div className="bg-white mt-2 shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-300">
        {courses.length > 0 ? (
          courses.map((course) => (
            <li key={course.id}>
              <div className="block py-2 hover:bg-gray-50 tracking-wider">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div>
                      <p className="text-md md:text-xl font-bold uppercase  text-gray-700 truncate">
                        {course.title}
                      </p>
                      <Dates course={course} />
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
          ))
        ) : (
          <p className=" text-md font-bold py-6 text-center text-gray-600">
            No Course on this Date
          </p>
        )}
      </ul>
    </div>
  );
};

export default CourseByDate;
