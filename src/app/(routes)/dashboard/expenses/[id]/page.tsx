"use client";

import {
  ArrowLeft,
  Edit,
  Trash2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../../../../components/BudgetItem";
import AddExpense from "@/components/AddExpense";
import ExpensesTable from "@/components/ExpensesTable";
import { db } from "../../../../../../utils/dbConfig";
import { Budgets, Expenses as DbExpenses } from "../../../../../../utils/scheme";
import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { toast } from "sonner";
import DeleteBudget from "@/components/DeleteBudget";
import NewBudgetModal from "@/components/NewBudgetModel";
import { useUser } from "@/components/Context";

interface Budget {
  id: number;
  name: string;
  amount: string;
  icon: string | null;
  createdBy: string;
  totalSpend: number;
  totalItem: number;
}

interface Expense {
  id: number;
  name: string;
  amount: string;
  budgetId: number | null;
  createdAt: string;
}

interface ExpensesItemProps {
  params: {
    id: number | string;
  };
}

const ExpensesItem: React.FC<ExpensesItemProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [budgetsData, setBudgetsData] = useState<Budget>();
  const [expensesData, setExpensesData] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");

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
      getBudgetInfo();
      getExpanseList();
    }
  }, [user, id]);

  const getBudgetInfo = async () => {
    try {
      if (!user) return;
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`SUM(CAST(${DbExpenses.amount} AS numeric))`.mapWith(Number),
          totalItem: sql`COUNT(${DbExpenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(DbExpenses, eq(Budgets.id, DbExpenses.budgetId))
        .where(
          and(
            eq(Budgets.createdBy, user),
            eq(Budgets.id, Number(id))
          )
        )
        .groupBy(Budgets.id);

      if (result.length) {
        setBudgetsData(result[0]);
      } else {
        console.log("No results found.");
      }
    } catch (error) {
      console.error("Error fetching budget info:", error);
      toast(`Error fetching budget info: ${error}`);
    }
  };

  const getExpanseList = async () => {
    try {
      if (!user) return;
      const result = await db
        .select()
        .from(DbExpenses)
        .where(eq(DbExpenses.budgetId, Number(id)))
        .orderBy(desc(DbExpenses.id));

      if (result.length) {
        setExpensesData(result);
      } else {
        console.log("No results found.");
      }
    } catch (error) {
      console.error("Error fetching expenses list:", error);
      toast(`Error fetching expenses list: ${error}`);
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: number | string) => {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    try {
      await db.delete(DbExpenses).where(eq(DbExpenses.budgetId, numericId)).returning();
      await db.delete(Budgets).where(eq(Budgets.id, numericId)).returning();
      toast("Budgets deleted!");
      setIsModalOpen(false);
      router.back();
    } catch (error) {
      toast(`Error: ${error}`);
      console.error("Error deleting budget:", error);
    }
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-2 gap-3">
        <div className="flex justify-center items-center gap-3">
          <ArrowLeft onClick={handleBack} className="h-6 w-6 cursor-pointer text-semibold" />
          <h1 className="text-2xl font-semibold">My Expenses</h1>
        </div>
        <div className="flex justify-center items-center gap-2 ">
          <button
            type="button"
            onClick={handleEdit}
            className="bg-primary rounded text-white py-2 px-4 h-10 cursor-pointer flex justify-center items-center gap-3 hover:bg-primary/90"
          >
            <Edit size="24" /> <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 rounded text-white py-2 px-4 h-10 cursor-pointer flex justify-center items-center gap-3 hover:bg-red-600"
          >
            <Trash2Icon size="24" /> <span>Delete</span>
          </button>

          <DeleteBudget
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={() => handleDelete(id)}
            message="Are you sure you want to delete this expense?"
          />
        </div>
      </div>
      {isEditModalOpen && (
        <NewBudgetModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEdit}
          handleBudgetUpdate={getBudgetInfo}
          budgetsData={budgetsData}
        />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-8">
        {budgetsData ? (
          <BudgetItem budget={budgetsData} />
        ) : (
          [1].map((item, index) => (
            <div
              key={index}
              className="w-full bg-slate-200 rounded h-[150px] animate-pulse"
            ></div>
          ))
        )}
        <AddExpense
          budgetId={Number(id)}
          budgetsData={budgetsData}
          refreshBudget={getBudgetInfo}
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
