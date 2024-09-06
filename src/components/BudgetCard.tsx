import React from "react";
import { Car } from "lucide-react";


const BudgetCard: React.FC = () => {
  return (
    <div className="rounded w-full  p-4 ring ring-indigo-50 sm:p-6 lg:p-8 bg-slate-50 shadow">
      <div className="flex items-center justify-between gap-4 sm:gap-8 mb-4">
        <div className="flex items-center gap-4">
          <div
            className="bg-primary/20 flex items-center justify-center rounded-full p-2"
            aria-hidden="true"
          >
            <Car size="24" />
          </div>
          <div>
            <strong className="block text-base font-bold">Shopping Card</strong>
            <p className="text-sm">2 items</p>
          </div>
        </div>
        <div>
          <strong className="text-primary text-xl">$586</strong>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between mb-2">
          <p className="text-sm text-gray-500">$586</p>
          <p className="text-sm text-gray-500">$58</p>
        </div>
        <div>
          <span id="ProgressLabel" className="sr-only">
            Loading
          </span>

          <span
            role="progressbar"
            aria-labelledby="ProgressLabel"
            aria-valuenow="50"
            className="block rounded-full bg-gray-200"
          >
            <span className="block h-4 rounded-full bg-indigo-600 text-center text-[10px] text-white">
              <span className="font-bold">50%</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
