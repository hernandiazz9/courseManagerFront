import React from "react";
import { useRouter } from "next/router";
import Layout from "../../component/Layout";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";

const GET_COURSE = gql`
  query GetCourse($getCourseId: ID!) {
    getCourse(id: $getCourseId) {
      id
      title
      startDate
      startTime
      courseLength
      instructor
      studentList
    }
  }
`;

const EditCourse = () => {
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  console.log(pid);

  const { data, loading } = useQuery(GET_COURSE, {
    variables: {
      getCourseId: pid,
    },
  });

  //validation
  const schemaValidation = Yup.object({
    title: Yup.string().required("Title is Require"),
    startDate: Yup.date().required("Date is Require"),
    startTime: Yup.string().required("Start Time is Require"),
    courseLength: Yup.string().required("Course Lengthis Require"),
    instructor: Yup.string().required("Instructor is Require"),
    studentList: Yup.string().required("Student List is Require"),
  });

  console.log(data);

  return (
    <Layout>
      <h1 className="text-4xl my-6  text-center hidden md:block leading-6 font-medium text-black">
        Edit Course
      </h1>
      <div className="flex justify-center ">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={!loading && data.getCourse}
          >
            {(props) => {
              return (
                <form
                  onSubmit={props.handleSubmit}
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                >
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Title
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      type="text"
                      id="title"
                      placeholder="Corse Title.."
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                       value={props.values.title}
                    />
                    {props.touched.title && props.errors.title ? (
                      <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                        <p className="font-bold">{props.errors.title}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="startDate"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Start Date
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      type="date"
                      id="startDate"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                       value={props.values.startDate}
                    />
                    {props.touched.startDate && props.errors.startDate ? (
                      <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                        <p className="font-bold">{props.errors.startDate}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="startTime"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Start Time
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      type="time"
                      id="startTime"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                       value={props.values.startTime}
                    />
                    {props.touched.startTime && props.errors.startTime ? (
                      <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                        <p className="font-bold">{props.errors.startTime}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="courseLength"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Start Time
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      type="text"
                      id="courseLength"
                      placeholder="ej: 1.5 hs"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                       value={props.values.courseLength}
                    />
                    {props.touched.courseLength && props.errors.courseLength ? (
                      <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                        <p className="font-bold">{props.errors.courseLength}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="instructor"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Instructor
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      type="select" //averiguar el select
                      id="instructor"
                      placeholder="Select the Instructor"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                       value={props.values.instructor}
                    />
                    {props.touched.instructor && props.errors.instructor ? (
                      <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                        <p className="font-bold">{props.errors.instructor}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="studentList"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Start Time
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      type="select"
                      id="studentList"
                      placeholder="Select Student list"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                       value={props.values.studentList}
                    />
                    {props.touched.studentList && props.errors.studentList ? (
                      <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                        <p className="font-bold">{props.errors.studentList}</p>
                      </div>
                    ) : null}
                  </div>
                  <input
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                    type="submit"
                    value="Edit Course"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditCourse;
