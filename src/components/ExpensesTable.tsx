"use client";
import { BeerIcon } from "lucide-react";
import React from "react";

const ExpensesTable: React.FC = () => {
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
            <tr >
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                John Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                24/05/1995
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Web Developer
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-red-500">
               <BeerIcon size="24" onClick={()=>{alert("delete")}} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ExpensesTable;
