import React from "react";

const Duration = ({ formik }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="courseHs"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Durations
      </label>
      <input
        className="shadow appearance-none  border rounded  py-2 pl-2 text-gray-700"
        type="number"
        id="courseHs"
        placeholder="ej: 3"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.courseHs}
        step='1'
      />
      <span className="text-gray-700 text-sm font-bold mx-1">hs</span>
      <input
        className="shadow appearance-none border rounded mt-1  py-2 pl-2 text-gray-700"
        type="number"
        id="courseMin"
        placeholder="ej: 30 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.courseMin}
        step='30'
      />
      <span className="text-gray-700 text-sm font-bold mx-1">min</span>
      {formik.touched.courseHs && formik.errors.courseHs ? (
        <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
          <p className="font-bold">{formik.errors.courseHs}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Duration;
