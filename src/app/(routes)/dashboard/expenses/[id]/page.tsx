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
import { toast } from "sonner";
import DeleteBudget from "@/components/DeleteBudget";

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
  const [budgetsData, setBudgetsData] = useState<Budget>();
  const [expensesData, setExpensesData] = useState();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getBudgetInfo();
    getExpanseList();
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
        setBudgetsData(result[0]);
      } else {
        console.log("No results found.");
      }
    } catch (error) {
      console.error("Error fetching budget info:", error); // More descriptive error message
    }
  };

  const getExpanseList = async () => {
    try {
      const result = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.budgetId, Number(id)))
        .orderBy(desc(Expenses.id));
      if (result) {
        setExpensesData(result);
      } else {
        console.log("No results found.");
      }
    } catch (error) {
      console.error("Error fetching expenses list:", error);
    }
  };

  const handleEdit = () => {
    alert("Edit");
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, id))
        .returning();
      if (result) {
        toast("Budgets deleted");
        setIsModalOpen(false);
        router.back();
      }
    } catch (error) {
      toast(`Error: ${error}`);
    }
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
            onClick={() => setIsModalOpen(true)}
            className={`bg-red-500 rounded text-white py-2 px-4  relative h-10  cursor-pointer flex justify-center items-center gap-3 hover:bg-red-600`}
          >
            <BeerIcon size="24" /> <span>Delete</span>
          </button>

          <DeleteBudget
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={() => handleDelete(id)}
            message="Are you sure you want to delete this expense?"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-8">
        {budgetsData ? (
          <BudgetItem budget={budgetsData} />
        ) : (
          [1].map((item, index) => (
            <div
              key={index}
              className=" w-full bg-slate-200 rounded h-[150px] animate-pulse"
            ></div>
          ))
        )}
        <AddExpense
          budgetId={id}
          refreshBudget={() => getBudgetInfo()}
          refreshExpanses={getExpanseList}
        />
      </div>
      <div className="pb-10 pt-4">
        <h1 className="text-2xl font-semibold pb-3">Latest Expenses</h1>
        <ExpensesTable expenses={expensesData} refreshTable={getExpanseList} />
      </div>
    </div>
  );
};

export default ExpensesItem;
