"use client";
import React, { useEffect, useState } from "react";
import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import { index } from "drizzle-orm/mysql-core";

interface MenuCardProps {
  budget: Budget[];
}

interface Budget{
  id: number;
  name: string;
  amount: string;
  icon?: string | null |undefined;
  createdBy?: string;
  totalSpend?: number;
  totalItem?: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ budget }) => {
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [totalSpend, setTotalSpend] = useState<number>(0);
  const [totalItem, setTotalItem] = useState<number>(0);

  useEffect(() => {
    CalculateBudget();
  }, [budget]);

  const CalculateBudget = () => {
    let budgetTotal = 0;
    let spendTotal = 0;

    budget?.forEach((item) => {
      budgetTotal += Number(item.amount);
      spendTotal += Number(item.totalSpend);
    });

    setTotalBudget(budgetTotal);
    setTotalSpend(spendTotal);
    setTotalItem(budget?.length);
  };

  const dashboardMenu = [
    {
      label: "Total Budget",
      icon: PiggyBank,
      amount: totalBudget,
    },
    {
      label: "Total Spend",
      icon: ReceiptText,
      amount: totalSpend,
    },
    {
      label: "No. Of Budget",
      icon: Wallet,
      amount: totalItem,
    },
  ];
  return (
    <>
      {budget?.length >0 
        ? dashboardMenu.map((item) => (
            <div
              key={item.label}
              className="shadow-sm ring ring-neutral-100/80 rounded flex justify-between items-center p-10"
            >
              <div>
                <p className="text-xs font-semibold text-gray-700">
                  {item.label}
                </p>
                <strong className="block text-lg font-bold">
                  ${item.amount}
                </strong>
              </div>
              <div
                className="bg-primary flex items-center justify-center rounded-full p-3 w-12 h-12"
                aria-hidden="true"
              >
                <item.icon className="text-white h-6 w-6" />
              </div>
            </div>
          ))
        : [1, 2, 3].map((item, index) => (
            <div key={index} className=" w-full bg-slate-200 rounded h-[130px] animate-pulse my-4">
            </div>
          ))}
    </>
  );
};

export default MenuCard;
