"use client";

import { PiggyBank, ReceiptText } from "lucide-react";
import React, { useState } from "react";
import MenuCard from "../../../components/MenuCard";
import ExpensesTable from "@/components/ExpensesTable";
import BudgetItem from "@/components/BudgetItem";

const Dashboard = () => {
  const dashboardMenu = [
    {
      label: "Total Budget",
      icon: PiggyBank,
      amount: 345345,
    },
    {
      label: "Total Spend",
      icon: ReceiptText,
      amount: 234234,
    },
    {
      label: "No. Of Budget",
      icon: ReceiptText,
      amount: 5,
    },
  ];
  const [data, setData] = useState({
    id: 1,
    name: "Monthly Groceries",
    amount: "500.00",
    icon: "🍎", // Could be a string representing an emoji or a URL to an icon
    createdBy: "John Doe",
    totalSpend: 450.75,
    totalItem: 10,
  });
  return (
    <div>
      <div className="p-4">
        <h1 className="text-3xl font-semibold">Hi, Abu Bakar</h1>
        <p>here's what happping with your money, Lets Manage your expenses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-4 px-4">
        {dashboardMenu.map((item, index) => (
          <MenuCard key={index} item={item} />
        ))}
      </div>

      <div className="p-4 flex justify-between items-start flex-col lg:flex-row w-full gap-5">
        <div className="w-full lg:w-[60%]">
          <div>
            <h1 className="text-xl font-semibold pb-3">Graph</h1>
          </div>
          <div>
            <h1 className="text-xl font-semibold pb-3">Latest Expenses</h1>
            <ExpensesTable />
          </div>
        </div>
        <div className="w-full lg:w-[40%]">
          <h1 className="text-xl font-semibold pb-3">Latest Budgets</h1>
          <BudgetItem budget={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
