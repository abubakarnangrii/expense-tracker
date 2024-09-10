"use client";

import React, { useEffect, useState } from "react";
import MenuCard from "../../../components/MenuCard";
import ExpensesTable from "@/components/ExpensesTable";
import BudgetItem from "@/components/BudgetItem";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "../../../../utils/scheme";
import { db } from "../../../../utils/dbConfig";

interface BudgetList {
  id: number;
  name: string;
  amount: string;
  icon: string | null;
  createdBy: string;
  totalSpend: number;
  totalItem: number;
}

const Dashboard = () => {
  const [budgetList, setBudgetList] = useState<BudgetList[]>([]);

  useEffect(() => {
    getBudgets();
  }, []);

  const getBudgets = async () => {
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
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      if (result) {
        setBudgetList(result);
      }
    } catch (error) {
      console.error("Error fetching budgets:", error); // Error handling
    }
  };

  return (
    <div>
      <div className="p-4">
        <h1 className="text-3xl font-semibold">Hi, Abu Bakar ✌️</h1>
        <p>{`here's what happping with your money, Lets Manage your expenses`}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-4 px-4">
        <MenuCard budget={budgetList} />
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
          {budgetList?.length > 0
            ? budgetList.map((budget) => (
                <BudgetItem
                  key={budget.id}
                  budget={budget}
                  className={"my-4"}
                /> // Pass budget data to ExpenseCard
              ))
            : [1, 2, 3].map((item, index) => (
                <div
                  key={index}
                  className=" w-full bg-slate-200 rounded h-[150px] animate-pulse my-4"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
