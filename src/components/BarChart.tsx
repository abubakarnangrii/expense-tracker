import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";

interface Budget {
  id: number;
  name: string;
  amount: string; // Ensure this is a number for proper scaling
  icon?: string | null;
  createdBy?: string;
  totalSpend?: number; // Ensure this is a number as well
  totalItem?: number;
}

interface BarChartComponentProps {
  budgetList: Budget[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ budgetList }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={budgetList} margin={{ top: 5, left: 0, right: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpend" stackId="a" fill="#7F57F1" />
        <Bar dataKey="amount" stackId="a" fill="#C3C2ff" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
