"use client";

import { ArrowLeft, BeerIcon, DeleteIcon, Edit } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../../../../components/BudgetItem";
import AddExpense from "@/components/AddExpense";
import ExpensesTable from "@/components/ExpensesTable";

const ExpensesItem:React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState({
    id: 1,
    name: "Monthly Groceries",
    amount: "500.00",
    icon: "🍎", // Could be a string representing an emoji or a URL to an icon
    createdBy: "John Doe",
    totalSpend: 450.75,
    totalItem: 10
  })
  

  useEffect(() => {
    setData(`call this id and fecth data of this ${id}`);
  }, [id]);

  const handleEdit = () => {
    alert("Edit");
  };

  const handleDelete = () => {
    alert("Delete");
  };
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row  justify-between items-start md:items-center my-2 gap-3">
        <div className="flex justify-center items-center gap-3">
          <ArrowLeft
            onClick={handleBack}
            className="h-6 w-6 cursor-pointer text-semibold"
          />
          <h1 className="text-2xl font-semibold">My Expenses</h1>
        </div>
        <div className="flex justify-center items-center gap-2 ">
          <button
            type={"submit"}
            onClick={handleEdit}
            className={`bg-primary rounded text-white py-2 px-4   relative h-10  cursor-pointer flex justify-center items-center gap-3 hover:bg-primary/90`}
          >
            <Edit size="24" /> <span>Edit</span>
          </button>
          <button
            type={"submit"}
            onClick={handleDelete}
            className={`bg-red-500 rounded text-white py-2 px-4  relative h-10  cursor-pointer flex justify-center items-center gap-3 hover:bg-red-600`}
          >
            <BeerIcon size="24" /> <span>Delete</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-8">
        <BudgetItem budget={data} />
        <AddExpense />
      </div>
      <div className="pb-10 pt-4">
        <h1 className="text-2xl font-semibold pb-3">Latest Expenses</h1>
        <ExpensesTable/>
      </div>
    </div>
  );
};

export default ExpensesItem;
