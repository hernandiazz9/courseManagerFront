import React from "react";
import Layout from "../component/Layout";

const NewCourse = () => {
  return (
    <Layout>
      <h1 className="text-4xl mt-4 text-center hidden md:block leading-6 font-medium text-black">
        New Course
      </h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">
                algo
              </label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700' type="text" />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewCourse;
