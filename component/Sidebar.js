import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="bg-gray-800 md:w-1/4  xl:w-1/6 p-5">
      <div className="sticky top-0">
        <p className="text-white text-2xl font-black">Course Manager</p>
        <nav className="mt-5 list-none flex flex-row 	md:flex-col">
          <li
            className={
              router.pathname === "/" ||
              router.pathname === "/newcourse" ||
              router.pathname === "/checkdays"
                ? "bg-blue-800 p-2"
                : "p-2"
            }
          >
            <Link href="/">
              <a className="text-white  block">Courses</a>
            </Link>
          </li>
          <li
            className={
              router.pathname === "/instructors" ||
              router.pathname === "/newinstructor"
                ? "bg-blue-800 p-2"
                : "p-2"
            }
          >
            <Link href="/instructors">
              <a className="text-white  block">Instructors</a>
            </Link>
          </li>
          <li
            className={
              router.pathname === "/students" ||
              router.pathname === "/newstudent" ||
              router.pathname === "/studentlist"
                ? "bg-blue-800 p-2"
                : "p-2"
            }
          >
            <Link href="/students">
              <a className="text-white  block">Students</a>
            </Link>
          </li>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
