import React from "react";
import { useRouter } from "next/router";
import Layout from "../../component/Layout";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const GET_INSTRUCTOR = gql`
  query GetInstructor($instructorID: ID!) {
    getInstructor(id: $instructorID) {
      id
      email
      name
      lastName
    }
  }
`;
const EDIT_INSTRUCTOR = gql`
  mutation EditInstructor($editInstructorId: ID!, $input: InstructorInput) {
    editInstructor(id: $editInstructorId, input: $input) {
      email
      id
      name
      lastName
    }
  }
`;

const EditInstructor = () => {
  const router = useRouter();
  const {
    query: { pid },
  } = router;
  //get instructor by id
  const { data, loading } = useQuery(GET_INSTRUCTOR, {
    variables: {
      instructorID: pid,
    },
  });

  //edit instructor
  const [editInstructor] = useMutation(EDIT_INSTRUCTOR);
  const editCourseById = async (values) => {
    const { email, name, lastName } = values;
    try {
      await editInstructor({
        variables: {
          editInstructorId: pid,
          input: {
            email,
            name,
            lastName,
          },
        },
      });
      Swal.fire("Edited", "Instructor Edited succesufully", "success");
      router.push("/instructors");
    } catch (error) {
      console.log(error);
    }
  };

  //validation
  const schemaValidation = Yup.object({
    name: Yup.string().required("Name is Require"),
    lastName: Yup.string().required("Last Name is Require"),
    email: Yup.string().required("Email Time is Require"),
  });
  // console.log(data);

  return (
    <Layout>
      <h1 className="text-4xl my-6  text-center hidden md:block leading-6 font-medium text-black">
        Edit Course
      </h1>
      {!loading ? (
        <div className="flex justify-center ">
          <div className="w-full max-w-lg">
            <Formik
              validationSchema={schemaValidation}
              enableReinitialize
              initialValues={data.getInstructor}
              onSubmit={(values) => {
                editCourseById(values);
              }}
            >
              {(props) => {
                return (
                  <form
                    onSubmit={props.handleSubmit}
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.name}
                      />
                      {props.touched.name && props.errors.name ? (
                        <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                          <p className="font-bold">{props.errors.name}</p>
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.lastName}
                      />
                      {props.touched.lastName && props.errors.lastName ? (
                        <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                          <p className="font-bold">{props.errors.lastName}</p>
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.email}
                      />
                      {props.touched.email && props.errors.email ? (
                        <div className="my-1 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 ">
                          <p className="font-bold">{props.errors.email}</p>
                        </div>
                      ) : null}
                    </div>

                    <input
                      className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                      type="submit"
                      value="Edit Instructor"
                    />
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      ) : (
        <p>Loading . . .</p>
      )}
    </Layout>
  );
};

export default EditInstructor;
