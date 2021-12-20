import React, { useState } from "react";
import Layout from "../component/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Instructors from "../component/newCourses/Instructors";
import StudentList from "../component/newCourses/StudentList";
import Swal from "sweetalert2";
import SelectDate from "../component/newCourses/SelectDate";
import Duration from "../component/newCourses/Duration";
import { format, addMinutes, addHours } from "date-fns";

const NEW_COURSE = gql`
  mutation NewCourse($input: CourseInput) {
    newCourse(input: $input) {
      id
      title
      startDate
      courseLength
      instructor {
        id
        name
        lastName
        email
      }
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
const GET_COURSES = gql`
  query GetCourses {
    getCourses {
      id
      title
      startDate
      courseLength
      instructor {
        id
        name
        lastName
        email
      }
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

const NewCourse = () => {
  const { data, loading, error } = useQuery(GET_COURSES);
  const [errorMsg, setErrorMsg] = useState(null)
  const [instructor, setInstructor] = useState({});
  const [studentList, setStudentList] = useState({});
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
  // console.log(data);
  // if (!loading) {
  //   const verify = data.getCourses.map((course) => {
  //     const dateStart = new Date(Number(course.startDate));
  //     const hsMin = course.courseLength.split(":");
  //     const addHs = addHours(dateStart, Number(hsMin[0]));
  //     const dateFinish = addMinutes(addHs, Number(hsMin[1]));

  //     console.log(dateStart.getTime(), "/", dateFinish.getTime());

  //   });
  // }

  const formik = useFormik({
    initialValues: {
      title: "",
      startDate: "",
      courseHs: 0,
      courseMin: 0,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is Require"),
      startDate: Yup.date().required("Date is Require"),
      courseHs: Yup.number("Must be a number").required("Course hs is Require"),
      courseMin: Yup.number("Must be a number").required(
        "Course min is Require"
      ),
    }),

    onSubmit: async (valores) => {
      const { title, startDate, courseHs, courseMin } = valores;
      const dateSelect = new Date(startDate);

      const verifyDisponibility = data.getCourses.filter((course) => {
        const dateStart = new Date(Number(course.startDate));
        const hsMin = course.courseLength.split(":");
        const addHs = addHours(dateStart, Number(hsMin[0]));
        const dateFinish = addMinutes(addHs, Number(hsMin[1]));
        return (
          dateSelect.getTime() > course.startDate &&
          dateSelect.getTime() < dateFinish.getTime()
        );
      });
      const sameInstructor = verifyDisponibility.map((course) => {
        return course.instructor.id === instructor.id;
      });
      if(sameInstructor.length >0)return setErrorMsg('Instructor is already in other curse in the same time')
      try {
        await newCourse({
          variables: {
            input: {
              title,
              startDate,
              courseLength: courseHs + ":" + courseMin,
              instructor: instructor.id,
              studentList: studentList.id,
            },
          },
        });
        Swal.fire("Created", "Course created succesfully", "success");
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
            <SelectDate formik={formik} />
            <Duration formik={formik} />
            <Instructors setInstructor={setInstructor} />
            <StudentList setStudentList={setStudentList} />

            <input
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              type="submit"
              value="Create Course"
            />
            {errorMsg? (
                <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                  <p className="font-bold">{errorMsg}</p>
                </div>
              ) : null}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewCourse;
