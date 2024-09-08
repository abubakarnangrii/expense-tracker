import React from "react";
import Link from "next/link";

interface Budget {
  id: number;
  name: string;
  amount: string;
  icon: string | null;
  createdBy: string;
  totalSpend: number;
  totalItem: number;
}

interface BudgetItemProps {
  budget: Budget;
}

const BudgetItem: React.FC<BudgetItemProps> = ({ budget }) => {
  const Calculte = (amount: number, budget: number) => {
    return amount - budget;
  };

  return (
    <Link href={'/dashboard/expenses/'+budget?.id}>
      <div className="rounded w-full  p-4 ring ring-indigo-50 sm:p-6 lg:p-8 bg-slate-50 hover:shadow-md cursor-pointer">
        <div className="flex items-center justify-between gap-4 sm:gap-8 mb-4">
          <div className="flex items-center gap-4">
            <div
              className="bg-primary/20 flex items-center justify-center rounded-full p-3 w-12 h-12"
              aria-hidden="true"
            >
              <span>{budget.icon}</span>
            </div>
            <div>
              <strong className="block text-base font-bold">
                {budget.name}
              </strong>
              <p className="text-sm text-gray-500">{budget.totalItem} items</p>
            </div>
          </div>
          <div>
            <strong className="text-primary text-xl">${budget.amount}</strong>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-500">
              ${budget.totalSpend ?? "0"}
              {" spend"}
            </p>
            <p className="text-sm text-gray-500">
              ${Calculte(Number(budget.amount), Number(budget.totalSpend))}
              {" remaining"}
            </p>
          </div>
          <div>
            <div className="bg-primary/20 h-2 rounded-full w-full">
              <div
                className="bg-primary h-2 rounded-full"
                style={{
                  width: `${
                    (budget.totalSpend / Number(budget.amount)) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetItem;
