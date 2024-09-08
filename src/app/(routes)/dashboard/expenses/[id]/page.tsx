"use client";

import { ArrowLeft, BeerIcon, DeleteIcon, Edit } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../../../../components/BudgetItem";
import AddExpense from "@/components/AddExpense";
import ExpensesTable from "@/components/ExpensesTable";
import { db } from "../../../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../../../utils/scheme";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";

interface Budget {
  id: number;
  name: string;
  amount: string;
  icon: string | null;
  createdBy: string;
  totalSpend: number;
  totalItem: number;
}

const ExpensesItem: React.FC = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [data, setData] = useState<Budget>();

  useEffect(() => {
    getBudgetInfo();
    console.log(id);
  }, [id]);

  const getBudgetInfo = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`SUM(CAST(${Expenses.amount} AS numeric))`.mapWith(
            Number
          ),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, "abubakar"))
        .where(eq(Budgets.id, Number(id))) // Ensure 'id' is defined in the scope
        .groupBy(Budgets.id);

      if (result) {
        setData(result[0]);
        console.log("Budget Info:", result); // Added more descriptive log message
      } else {
        console.log("No results found.");
      }
    } catch (error) {
      console.error("Error fetching budget info:", error); // More descriptive error message
    }
  };

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
        {data ? (
          <BudgetItem budget={data} />
        ) : (
          [1].map((item, index) => (
            <div
              key={index}
              className=" w-full bg-slate-200 rounded h-[150px] animate-pulse"
            ></div>
          ))
        )}
        <AddExpense budgetId={id} refreshData= {()=>getBudgetInfo()}/>
      </div>
      <div className="pb-10 pt-4">
        <h1 className="text-2xl font-semibold pb-3">Latest Expenses</h1>
        <ExpensesTable />
      </div>
    </div>
  );
};

export default ExpensesItem;
