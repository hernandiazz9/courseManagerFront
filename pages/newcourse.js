import React from "react";
import Layout from "../component/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery,useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const NEW_COURSE = gql`
  mutation NewCourse($input: CourseInput) {
    newCourse(input: $input) {
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
const GET_COURSES = gql`
  query GetCourses {
    getCourses {
      id
      title
      startDate
      studentList
      startTime
      courseLength
      instructor
    }
  }
`;

const NewCourse = () => {

  useQuery(GET_COURSES);
  const router = useRouter();
  const [newCourse] = useMutation(NEW_COURSE, {
    update(cache, { data: { newCourse } }) {
      const { getCourses } = cache.readQuery({ query: GET_COURSES });
      cache.writeQuery({
        query: GET_COURSES,
        data: {
          getCourses: [...getCourses, newCourse],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      startDate: "",
      startTime: "",
      courseLength: "",
      instructor: "",
      studentList: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is Require"),
      startDate: Yup.date().required("Date is Require"),
      startTime: Yup.string().required("Start Time is Require"),
      courseLength: Yup.string().required("Course Lengthis Require"),
      instructor: Yup.string().required("Instructor is Require"),
      studentList: Yup.string().required("Student List is Require"),
    }),
    onSubmit: async (valores) => {
      console.log(valores);
      const {
        title,
        startDate,
        startTime,
        courseLength,
        instructor,
        studentList,
      } = valores;
      try {
        const { data } = await newCourse({
          variables: {
            input: {
              title,
              startDate,
              startTime,
              courseLength,
              instructor: "61b70142896cdcdfdcaf5b5e",
              studentList: "61b73c232582c17e2823ebc9",
            },
          },
        });

        Swal.fire(
          'Created',
          'Course created succesfully',
          'success'
       )
        router.push("/");
      } catch (error) {
        console.log(error, "Error");
      }
    },
  });
  return (
    <Layout>
      <h1 className="text-4xl my-6  text-center hidden md:block leading-6 font-medium text-black">
        New Course
      </h1>
      <div className="flex justify-center ">
        <div className="w-full max-w-lg">
          <form
            onSubmit={formik.handleSubmit}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                  <p className="font-bold">{formik.errors.title}</p>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startTime}
              />
              {formik.touched.startTime && formik.errors.startTime ? (
                <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                  <p className="font-bold">{formik.errors.startTime}</p>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.courseLength}
              />
              {formik.touched.courseLength && formik.errors.courseLength ? (
                <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                  <p className="font-bold">{formik.errors.courseLength}</p>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.instructor}
              />
              {formik.touched.instructor && formik.errors.instructor ? (
                <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                  <p className="font-bold">{formik.errors.instructor}</p>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.studentList}
              />
              {formik.touched.studentList && formik.errors.studentList ? (
                <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                  <p className="font-bold">{formik.errors.studentList}</p>
                </div>
              ) : null}
            </div>
            <input
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              type="submit"
              value="Create Course"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewCourse;
