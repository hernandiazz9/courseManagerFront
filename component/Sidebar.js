import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {

   const router = useRouter()

  return (
    <aside className="bg-gray-800    p-5">
      <p className="text-white text-2xl font-black">Course Manager</p>

      <nav className="mt-5 list-none flex flex-row 	xl:flex-col">
         <li className={router.pathname === '/'?'bg-blue-800 p-2':'p-2'}>
            <Link href='/'>
               <a className='text-white  block'>
                  Courses
               </a>
            </Link>
         </li>
         <li className={router.pathname === '/instructors'?'bg-blue-800 p-2':'p-2'}>
            <Link href='/instructors'>
               <a className='text-white  block'>
                  Instructors
               </a>
            </Link>
         </li>
         <li className={router.pathname === '/students'?'bg-blue-800 p-2':'p-2'}>
            <Link href='/students'>
               <a className='text-white  block'>
                  Students
               </a>
            </Link>
         </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
