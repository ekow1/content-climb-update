"use client"

import Link from "next/link";

const DesktopNavbar = () => {
  return (
    <div className="fixed hidden sm:flex w-full bottom-10 z-40 text-center items-center justify-center">
      <div className="bg-slate-800 flex items-center text-white rounded-full mx-auto max-w-[660px] px-8 py-5 ">

        <ul className="flex gap-10 justify-around text-xl items-center">
          <li>
            <Link href="/" legacyBehavior>
              <a className="hover:bg-white hover:text-black hover:p-2 hover:rounded-lg ease-in-out duration-500 cursor-pointer">
                home
              </a>
            </Link>
          </li>
          <li>
            <Link href="post/newpost" legacyBehavior >
              <a className="hover:bg-white hover:text-black hover:p-2 hover:rounded-lg ease-in-out duration-500 cursor-pointer font-logo">
                contentclimb
              </a>
            </Link>
          </li>
          <li>
            <Link href="#" legacyBehavior>
              <a className="hover:bg-white hover:text-black hover:p-2 hover:rounded-lg ease-in-out duration-500 cursor-pointer">
                plans
              </a>
            </Link>
          </li>
          <li>
            <Link href="#" legacyBehavior>
              <a className="hover:bg-white hover:text-black hover:p-2 hover:rounded-lg ease-in-out duration-500 cursor-pointer">
                faq
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DesktopNavbar;
