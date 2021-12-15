import React from "react";

const Date = ({course}) => {
  return (
    <div className="mt-2 flex flex-col">
      <p className=" text-md font-bold text-gray-600">
        <span className=" text-sm font-light text-gray-500"> Start: </span>
        <time dateTime="2020-01-07">January 7, 2020 </time>
        <time dateTime="2020-01-07">
          <span className=" text-sm font-light text-gray-500"> at </span>
          {course.startTime}
        </time>
      </p>
      <p className=" text-md font-bold text-gray-600">
        <span className=" text-sm font-light text-gray-500">Length: </span>
        <time dateTime="10:30">1.5hs</time>
      </p>
    </div>
  );
};

export default Date;
