import React from "react";

const Instructor = ({course}) => {
  return (
    <div>
      <p className=" text-md font-bold text-gray-600">
        <span className=" text-sm font-light text-gray-500">Instructor: </span>
        {/* {course.instructor} */}
        Juan Pablo de la torres
      </p>
    </div>
  );
};

export default Instructor;
