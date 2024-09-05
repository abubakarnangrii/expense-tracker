"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center py-3 px-2 lg:px-20 xl:px-30 2xl:px-40 shadow bg-gray-100 dark:bg-boxdark-2/50">
      <div className="flex justify-center items-center">
        <Link href="/">
        <Image src={"/logo.svg"} alt="logo" width={130} height={50} />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-4">
        <a
          className="block w-1/2 rounded bg-primary px-6 py-3 text-sm font-medium text-white shadow hover:bg-primary/80 focus:outline-none  active:bg-primary/80 sm:w-auto"
          href="/sign-up"
        >
          Get Started
        </a>

        <a
          className="block w-1/2 rounded px-6 py-3 border text-sm font-medium text-primary shadow hover:text-primary/70 focus:outline-none  active:text-primary/80 sm:w-auto"
          href="/sign-in"
        >
          Sign in
        </a>
      </div>
    </div>
  );
};

export default Header;
