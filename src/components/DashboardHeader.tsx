"use client";
import React, { useState } from "react";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, Menu, X } from "lucide-react"; // Import icons from lucide-react
import { usePathname } from "next/navigation";

const DashboardHeader: React.FC = () => {
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="p-5 shadow-sm border-b bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mr-4">Dashboard</h1>
        <button
          className="block md:hidden text-gray-600 dark:text-gray-300"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24}  /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white dark:bg-gray-800 z-50 p-4 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <button className="absolute top-5 right-4 text-red-500" onClick={toggleMenu}>
          <X size={24} />
        </button>
        <ul className="py-10">
          {menuList.map((menu) => (
            <li key={menu.id}>
              <a
                className={`flex items-center gap-4 py-5 px-6 mb-2 font-medium hover:text-primary cursor-pointer rounded  hover:bg-primary/20 ${pathname === menu.path
                  && "text-primary bg-primary/20"}`}
                href={menu.path}
                onClick={() => setIsMenuOpen(false)}
              >
                <menu.icon size={20} />
                {menu.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

     
    </div>
  );
};

export default DashboardHeader;
