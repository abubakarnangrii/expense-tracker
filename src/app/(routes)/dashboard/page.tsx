"use client";

import React, { useEffect, useState } from "react";
import MenuCard from "../../../components/MenuCard";
import ExpensesTable from "@/components/ExpensesTable";
import BudgetItem from "@/components/BudgetItem";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "../../../../utils/scheme";
import { db } from "../../../../utils/dbConfig";
import BarChartComponent from "@/components/BarChart";

interface BudgetList {
  id: number;
  name: string;
  amount: string;
  createdAt: string;
}

interface Budget {
  id: number;
  name: string;
  amount: string;
  createdBy: string;
  totalSpend: number;
  totalItem: number;
}

const Dashboard: React.FC = () => {
  const [budgetList, setBudgetList] = useState<Budget[]>([]);
  const [expansesList, setExpansesList] = useState<BudgetList[]>([]);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('userEmail');
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      getBudgets();
      getAllExpense();
    }
  }, [user]);

  const getBudgets = async () => {
    try {
      if (!user) return;
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`SUM(CAST(${Expenses.amount} AS numeric))`.mapWith(Number),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      if (result) {
        setBudgetList(result);
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const getAllExpense = async () => {
    try {
      if (!user) return;
      const result = await db.select({
        id: Expenses.id,
        amount: Expenses.amount,
        name: Expenses.name,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user))
      .orderBy(desc(Expenses.id));

      if (result) {
        setExpansesList(result);
      }
    
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  }

  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Hi, {user || "Guest"} ✌️</h1>
        <p>{`Here's what’s happening with your money. Let's manage your expenses.`}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-4 px-4">
        <MenuCard budget={budgetList} />
      </div>

      <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-x-4">
        <div className="col-span-2">
          <div className="p-5 border rounded">
            <h1 className="text-xl font-semibold pb-3">Activity</h1>
            <BarChartComponent budgetList={budgetList} />
          </div>
          <div className="py-4">
            <h1 className="text-xl font-semibold pb-3">Latest Expenses</h1>
            <ExpensesTable expenses={expansesList} refreshTable={getAllExpense} />
          </div>
        </div>
        <div className="col-span-1">
          <h1 className="text-xl font-semibold pb-3">Latest Budgets</h1>
          {budgetList.length > 0
            ? budgetList.map((budget) => (
                <BudgetItem
                  key={budget.id}
                  budget={budget}
                  className={"my-4"}
                />
              ))
            : [1, 2, 3].map((item, index) => (
                <div
                  key={index}
                  className="w-full bg-slate-200 rounded h-[150px] animate-pulse my-4"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
