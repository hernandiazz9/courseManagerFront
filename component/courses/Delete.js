import React from "react";
import { useQuery,useMutation, gql } from "@apollo/client";

const DELETE_COURSE= gql`
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
const Delete = ({id}) => {

  const [deleteCourse] = useMutation(DELETE_COURSE, {
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

  const handleClick = async () => {
    const { data } = await deleteCourse({
      variables: {
        deleteCourseId: id
      },
    });
    console.log(data.deleteCourse);
  }
  return (
    <button
      type='button'
      onClick={handleClick}
    >
      <p className="px-2 text-center inline-flex text-xs leading-5 font-semibold uppercase rounded-full bg-green-100 text-green-800">
        delete
      </p>
    </button>
  );
};

export default Delete;
