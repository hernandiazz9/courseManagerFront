import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Swal from "sweetalert2";
import {useRouter} from "next/router";

const DELETE_COURSE = gql`
  mutation DeleteCourse($deleteCourseId: ID!) {
    deleteCourse(id: $deleteCourseId)
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
const Delete = ({ id }) => {
  const router = useRouter()
  const [deleteCourse] = useMutation(DELETE_COURSE, {
    update(cache) {
      const { getCourses } = cache.readQuery({ query: GET_COURSES });
      cache.writeQuery({
        query: GET_COURSES,
        data: {
          getCourses: getCourses.filter((course) => course.id !== id),
        },
      });
    },
  });

  const handleClick = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await deleteCourse({
            variables: {
              deleteCourseId: id,
            },
          });
          console.log(data.deleteCourse);
          Swal.fire("Deleted!", data.deleteCourse, "success");
          router.push('/')
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  return (
    <button type="button" onClick={handleClick}>
      <p className="px-2 ml-2 text-center inline-flex text-xs leading-5 font-semibold uppercase rounded-full bg-red-100 text-green-800">
        delete
      </p>
    </button>
  );
};

export default Delete;
