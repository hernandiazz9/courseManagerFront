import React, { useState } from "react";
import { compareAsc, format } from "date-fns";

const SelectDate = ({ formik }) => {
  let today = Date.now("yyyy/mm/dd");
  today = new Date(today);
  today = format(new Date(today), "yyyy-MM-dd'T'HH:mm");

  return (
    <div className="mb-4">
      <label
        htmlFor="startDate"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Start Date
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        type="datetime-local"
        min={today}
        id="startDate"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.startDate}
      />
      {formik.touched.startDate && formik.errors.startDate ? (
        <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
          <p className="font-bold">{formik.errors.startDate}</p>
        </div>
      ) : null}
    </div>
  );
};

export default SelectDate;
