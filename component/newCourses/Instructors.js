import React from "react";
import { useQuery, gql } from "@apollo/client";
import Select from "react-select";

const GET_INSTRUCTORS = gql`
  query GetInstructors {
    getInstructors {
      id
      email
      name
      lastName
    }
  }
`;

const Instructors = ({ setInstructor, instructor }) => {
  const { data, loading } = useQuery(GET_INSTRUCTORS);

  return (
    <div className="mb-4">
      <label
        htmlFor="instructor"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Instructor
      </label>
      <Select
        id="long-value-select"
        instanceId="long-value-select"
        options={!loading && data.getInstructors}
        value={instructor}
        onChange={(instructor) => setInstructor(instructor)}
        getOptionValue={(instructor) => instructor.id}
        getOptionLabel={(instructor) =>
          instructor.name + " " + instructor.lastName
        }
        placeholder="Select Instructor"
        noOptionsMessage={() => "No Data, create an Instructor first "}
      />
    </div>
  );
};

export default Instructors;
