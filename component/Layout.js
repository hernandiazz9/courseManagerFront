import React from "react";
import Head from "next/head";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Course manager</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <div className="bg-gray-200 ">
        <div className=" flex flex-col  md:flex-row  sm:min-w-screen md:min-h-screen ">
          <Sidebar />
          <main className="sm:w-full xl:w-4/5  p-5">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
