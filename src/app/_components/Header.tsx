"use client";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center py-3 px-2 lg:px-20 xl:px-30 2xl:px-40 shadow bg-gray-100 dark:bg-boxdark-2/50">
      <div className="flex justify-center items-center">
        <Link href="/">
          <svg
            id="logo-15"
            width="40"
            height="40"
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <path
              d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z"
              className="ccustom"
              fill="#17CF97"
            ></path>{" "}
            <path
              d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z"
              className="ccustom"
              fill="#17CF97"
            ></path>{" "}
            <path
              d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z"
              className="ccustom"
              fill="#17CF97"
            ></path>{" "}
            <path
              d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z"
              className="ccustom"
              fill="#17CF97"
            ></path>{" "}
          </svg>
        </Link>
      </div>
      <div className="flex justify-center items-center gap-4">
        <a
          className="block w-1/2 rounded bg-primary px-6 py-3 text-sm font-medium text-white shadow hover:bg-primary/80 focus:outline-none  active:bg-primary/80 sm:w-auto"
          href="#"
        >
          Get Started
        </a>

        <a
          className="block w-1/2 rounded px-6 py-3 border text-sm font-medium text-primary shadow hover:text-primary/70 focus:outline-none  active:text-primary/80 sm:w-auto"
          href="#"
        >
          Sign in
        </a>
      </div>
    </div>
  );
};

export default Header;
