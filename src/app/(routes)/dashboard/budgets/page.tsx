"use client";

import ExpenseCard from "@/components/BudgetCard";
import NewBudgetModal from "@/components/NewBudgetModel";
import NewBudgetModel from "@/components/NewBudgetModel";
import { Car, Plus } from "lucide-react";
import React, { useState } from "react";

const Budgets:React.FC = () => {
  const [budgetsModel, setBudgetsModel] = useState<boolean>(false);
  const handleNewBudget = () => {
    setBudgetsModel(true);
  };
  const handleCloseNewBudget = () => {
    setBudgetsModel(false);
  };
  return (
    <div className="p-4 relative">
      <h1 className="text-3xl font-semibold mb-4">My Budgets</h1>
      <div className="grid grid-cols-1 w-full  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <div onClick={handleNewBudget} className="w-full shadow border-black/20 border-dotted border-2 bg-primary/20 flex flex-col justify-center items-center hover:bg-primary/30 cursor-pointer rounded p-4 md:p-5">
          <Plus size="24" />
          <h2 className="text-base font-medium mt-2">Create New Budget</h2>
        </div>
        {[1, 2, 3].map((_, index) => (
          <ExpenseCard key={index} />
        ))}
      </div>
      <NewBudgetModal isOpen={budgetsModel} onClose={handleCloseNewBudget} />
    </div>
  );
};

export default Budgets;
