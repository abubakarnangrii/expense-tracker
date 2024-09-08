"use client";

import Breadcrumb from "@/components/Breadcrumb";
import ExpensesTable from "@/components/ExpensesTable";
import React from "react";

const Expenses = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center py-4 gap-2">
        <h1 className="text-3xl font-semibold">My Expenses</h1>
        <Breadcrumb name={"Expenses"} link={"expenses"} />
      </div>
      <div>
        <h1 className="text-xl font-semibold pb-3">Latest Expenses</h1>
        <ExpensesTable />
      </div>
    </div>
  );
};

export default Expenses;
