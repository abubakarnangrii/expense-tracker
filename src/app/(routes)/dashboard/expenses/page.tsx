"use client";

import Breadcrumb from "@/components/Breadcrumb";
import React, { useEffect, useState } from "react";
import ExpensesTable from "@/components/ExpensesTable";
import { desc, eq } from "drizzle-orm";
import { Budgets, Expenses as DbExpenses } from "../../../../../utils/scheme"; // Renamed DbExpenses
import { db } from "../../../../../utils/dbConfig";

// Renamed the interface to avoid confusion
interface Expenses {
  id: number;
  name: string;
  amount: string;
  createdAt: string;
}

const Expense: React.FC = () => {
  const [expensesList, setExpensesList] = useState<Expenses[]>([]);
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem('userEmail');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getAllExpense();
    }
  }, [user]);

  const getAllExpense = async () => {
    try {
      if (!user) return;
      const result = await db.select({
        id: DbExpenses.id,
        amount: DbExpenses.amount,
        name: DbExpenses.name,
        createdAt: DbExpenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(DbExpenses, eq(Budgets.id, DbExpenses.budgetId))
      .where(eq(Budgets.createdBy, user))
      .orderBy(desc(DbExpenses.id));

      const expenses: Expenses[] = result.map(item => ({
        id: item.id,
        name: item.name,
        amount: item.amount,
        createdAt: item.createdAt,
      }));

      setExpensesList(expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      // Consider setting an error state to provide feedback to users
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center py-4 gap-2">
        <h1 className="text-3xl font-semibold">My Expenses</h1>
        <Breadcrumb name={"Expenses"} link={"expenses"} />
      </div>
      <div>
        <h1 className="text-xl font-semibold pb-3">Latest Expenses</h1>
        <ExpensesTable expenses={expensesList} refreshTable={getAllExpense} />
      </div>
    </div>
  );
};

export default Expense;
