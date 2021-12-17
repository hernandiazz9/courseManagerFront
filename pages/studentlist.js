import React from "react";
import Layout from "../component/Layout";
import ExistinStudentList from "../component/studentList/ExistinStudentList";
import NewStudentList from "../component/studentList/NewStudentList";

const newstudentlist = () => {
  return (
    <Layout>
      <h1 className="text-4xl my-6  text-center hidden md:block leading-6 font-medium text-black">
        Student List
      </h1>
      <div className="flex flex-col md:flex-row justify-between ">
        <div className="w-full max-w-lg">
          <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            <ExistinStudentList />
          </div>
        </div>
        <div className="w-full max-w-lg">
          <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            <NewStudentList />
          </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default newstudentlist;
