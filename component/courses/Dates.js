import React from "react";
import { addHours, addMinutes, format } from "date-fns";

const Dates = ({ course }) => {
  console.log(course, "courrs");

  const date = new Date(Number(course.startDate));
  const dateSelected = format(date, "yyyy-MM-dd'T'HH:mm");
  const dateFormat = format(date, "MMMM dd, yyyy 'at' HH:mm 'hs' ");
  const hsMin = course.courseLength.split(":");
  const addHs = addHours(date, Number(hsMin[0]));
  const untilHs = addMinutes(addHs, Number(hsMin[1]));
  const dateFormatUntil = format(untilHs, "MMMM dd, yyyy 'at' HH:mm 'hs' ");

  // console.log(dateFormatUntil);

  return (
    <div className="mt-2 flex flex-col">
      <p className=" text-md font-bold text-gray-600">
        <span className=" text-sm font-light text-gray-500"> Start: </span>
        <time dateTime={dateSelected}>{dateFormat}</time>
      </p>
      <p className=" text-md font-bold text-gray-600">
        <span className=" text-sm font-light text-gray-500">Until: </span>
        <time dateTime="10:30">{dateFormatUntil}</time>
      </p>
      <p className=" text-md font-bold text-gray-600">
        <span className=" text-sm font-light text-gray-500">duration: </span>
        <time dateTime="10:30">{course.courseLength}</time>
      </p>
    </div>
  );
};

export default Dates;
