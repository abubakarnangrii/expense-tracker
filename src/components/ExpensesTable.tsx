"use client";
import { Trash2Icon } from "lucide-react";
import React from "react";
import { db } from "../../utils/dbConfig";
import { Expenses } from "../../utils/scheme";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

interface Expanses {
  id: number;
  name: string;
  amount: string;
  createdAt: string;
  budgetId: number;
}

interface ExpansesTableProps {
  expenses: Expanses[];
  refreshTable: () => void;
}

const ExpensesTable: React.FC<ExpansesTableProps> = ({
  expenses,
  refreshTable,
}) => {
  const handleDelete = async (expense: Expanses) => {
    try {
      const result = await db
        .delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();
      if (result) {
        toast("Expanse deleted");
        refreshTable();
      }
    } catch (error) {
      toast(`Error: ${error}`);
    }
  };
  return (
    <div className="rounded-lg border border-gray-200">
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr className="bg-primary/30">
              <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-base font-bold">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-base font-bold text-gray-900">
                Amount
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-base font-bold text-gray-900">
                Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 ftext-base font-bold text-gray-900">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {expenses?.map((expanse: Expanses) => (
              <tr key={expanse.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {expanse.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {expanse.amount}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {expanse.createdAt}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-red-500">
                  <Trash2Icon
                    size="24"
                    onClick={() => {
                      handleDelete(expanse);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpensesTable;
