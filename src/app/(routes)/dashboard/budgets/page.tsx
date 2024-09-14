"use client";

import ExpenseCard from "@/components/BudgetItem";
import NewBudgetModal from "@/components/NewBudgetModel"; // Corrected import
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "../../../../../utils/scheme";
import Loader from "@/components/Loader";
import Breadcrumb from "@/components/Breadcrumb";
import { useUser } from "@/components/Context";

interface Budgets {
  id: number;
  name: string;
  amount: string;
  icon?: string | null;
  createdBy: string;
  totalSpend: number;
  totalItem: number;
}

const Budget: React.FC = () => {
  const [budgetsModel, setBudgetsModel] = useState<boolean>(false);
  const [budgetList, setBudgetList] = useState<Budgets[]>([]);
  const [user,setUser]  = useState<string>("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('userEmail');
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, []);

  const handleNewBudget = () => {
    setBudgetsModel(true);
  };

  const handleCloseNewBudget = () => {
    setBudgetsModel(false);
  };

  useEffect(() => {
    getBudgets();
  }),[];

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
          .where(eq(Budgets.createdBy,user))
          .groupBy(Budgets.id).orderBy(desc(Budgets.id));

        if (result) {
          setBudgetList(result);
        }
    } catch (error) {
      console.error("Error fetching budgets:", error); // Error handling
    }
  };

  return (
    <div className="p-4 relative">
      <div className="flex flex-col justify-center items-center py-4 gap-2">
      <h1 className="text-3xl font-semibold">My Budgets</h1>
      <Breadcrumb name={"Budgets"} link={'budgets'}/>
      </div>

      <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <div
          onClick={handleNewBudget}
          className="w-full shadow border-black/20 border-dotted border-2 bg-primary/20 flex flex-col justify-center items-center hover:bg-primary/30 hover:shadow-md cursor-pointer rounded p-4 md:p-5"
        >
          <Plus size="24" />
          <h2 className="text-base font-medium mt-2">Create New Budget</h2>
        </div>
        {budgetList?.length>0 ? (budgetList.map((budget) => (
          <ExpenseCard key={budget.id} budget={budget} /> 
        ))):(
        [1,2,3,4.5].map((item,index)=>(
          <div key={index} className=" w-full bg-slate-200 rounded h-[150px] animate-pulse">

          </div>
        )
      ))}
      </div>
      <NewBudgetModal isOpen={budgetsModel} onClose={handleCloseNewBudget} handleBudgetUpdate={getBudgets} />
    </div>
  );
};

export default Budget;
