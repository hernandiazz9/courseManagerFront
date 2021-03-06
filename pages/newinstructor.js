import React, { useState } from "react";
import Layout from "../component/Layout";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const NEW_INSTRUCTOR = gql`
  mutation NewInstructor($input: InstructorInput) {
    newInstructor(input: $input) {
      id
      lastName
      name
      email
    }
  }
`;
const GET_INSTRUCTOR = gql`
  query GetInstructors {
    getInstructors {
      id
      email
      name
      lastName
    }
  }
`;

const NewInstructor = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  useQuery(GET_INSTRUCTOR);
  const router = useRouter();
  const [newInstructor] = useMutation(NEW_INSTRUCTOR, {
    update(cache, { data: { newInstructor } }) {
      const { getInstructors } = cache.readQuery({ query: GET_INSTRUCTOR });
      cache.writeQuery({
        query: GET_INSTRUCTOR,
        data: {
          getInstructors: [...getInstructors, newInstructor],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is Require"),
      lastName: Yup.string().required("Last Name is Require"),
      email: Yup.string().required("Email Time is Require"),
    }),
    onSubmit: async (valores) => {
      const { name, lastName, email } = valores;
      try {
        await newInstructor({
          variables: {
            input: {
              name,
              lastName,
              email,
            },
          },
        });

        Swal.fire("Added", "Instructor added succesfully", "success");
        router.push("/instructors");
      } catch (error) {
        setErrorMsg(error.message);
      }
    },
  });
  if (errorMsg) {
    setTimeout(() => {
      setErrorMsg(null);
    }, 3000);
  }
  return (
    <Layout>
      <h1 className="text-4xl my-6  text-center hidden md:block leading-6 font-medium text-black">
        New Instructor
      </h1>
      <div className="flex justify-center ">
        <div className="w-full max-w-lg">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                type="text"
                id="name"
                placeholder="Instructor Name.."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                  <p className="font-bold">{formik.errors.name}</p>
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                type="text"
                id="lastName"
                placeholder="Instructor Last Name.."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                  <p className="font-bold">{formik.errors.lastName}</p>
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                type="text"
                id="email"
                placeholder="Instructor Email.."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                  <p className="font-bold">{formik.errors.email}</p>
                </div>
              ) : null}
            </div>

            <input
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              type="submit"
              value="Add Instructor"
            />
            {errorMsg ? (
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

export default NewInstructor;
