"use client";
import React from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import path from "path";

const SideNav = () => {
  const pathname = usePathname();
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];
  return (
    <div className=" py-5 px-2  dark:bg-boxdark-2/50 h-screen shadow-md border border-slate-50">
      <div className="flex justify-center items-center ">
        <Image src={"/logo.svg"} alt="logo" width={130} height={50} />
      </div>
      <div className="py-6">
        {menuList.map((menu) => (
          <Link key={menu.id} href={menu.path}>
            <h2
              className={`flex items-center gap-2 font-medium p-5 cursor-pointer rounded  hover:text-primary hover:bg-primary/20 mb-2 ${
                pathname === menu.path
                  && "text-primary bg-primary/20"}`}
            >
              <menu.icon size={20} />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 flex gap-2 p-5 items-center">
        <p>user</p>
      </div>
    </div>
  );
};

export default SideNav;
