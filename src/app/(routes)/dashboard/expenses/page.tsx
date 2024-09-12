"use client";

import Breadcrumb from "@/components/Breadcrumb";
import React, { useEffect, useState } from "react";
import ExpensesTable from "@/components/ExpensesTable";
import { desc, eq } from "drizzle-orm";
import { Budgets,Expenses } from "../../../../../utils/scheme";
import { db } from "../../../../../utils/dbConfig";


const Expense = () => {
  const [expansesList, setExpansesList] = useState([]);
  useEffect(() => {
    getAllExpense();
  }, []);
  const getAllExpense = async () => {
    try {
      const result = await db.select({
        id: Expenses.id,
        amount: Expenses.amount,
        name: Expenses.name,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, "abubakar"))
      .orderBy(desc(Expenses.id));
  
      if (result) {
        setExpansesList(result);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  }
  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center py-4 gap-2">
        <h1 className="text-3xl font-semibold">My Expenses</h1>
        <Breadcrumb name={"Expenses"} link={"expenses"} />
      </div>
      <div>
        <h1 className="text-xl font-semibold pb-3">Latest Expenses</h1>
        <ExpensesTable expenses={expansesList} refreshTable={getAllExpense}/>
      </div>
    </div>
  );
};

export default Expense;
