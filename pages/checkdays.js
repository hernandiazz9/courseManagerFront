import React, { useState } from "react";
import Layout from "../component/Layout";
import { useQuery, gql } from "@apollo/client";
import CourseByDate from "../component/checkDays/CourseByDate";

const GET_COURSE_BY_DATE = gql`
  query GetCourseByDate($date: String!) {
    getCourseByDate(date: $date) {
      title
      instructor {
        email
        lastName
        name
      }
      id
      startDate
      courseLength
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

const CheckDays = () => {
  const [dateSelect, setDateSelect] = useState("");

  const { data, loading } = useQuery(GET_COURSE_BY_DATE, {
    variables: {
      date: dateSelect,
    },
  });

  return (
    <Layout>
      <h1 className="text-2xl text-center  leading-5 font-medium text-black my-7">
        Check day
      </h1>
      <div className="flex flex-col justify-center">
        <form className="bg-white w-full max-w-lg m-auto shadow-md px-8 pt-6 pb-8 mb-4 ">
          <div className="mb-4">
            <label
              htmlFor="listName"
              className="block text-gray-700 text-md font-bold mb-2"
            >
              Select Day
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="date"
              onChange={(e) => setDateSelect(e.target.value)}
              value={dateSelect}
              placeholder="List Name"
              id="listName"
              placeholder="Student Name.."
              required
            />
          </div>
        </form>

        {!loading ? <CourseByDate courses={data.getCourseByDate} />:<p className='text-center'>Loading . . . </p>}
      </div>
    </Layout>
  );
};

export default CheckDays;
