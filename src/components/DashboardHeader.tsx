import React from "react";

const DashboardHeader: React.FC = () => {
  return (
    <div className="p-5 shadow-sm border-b">
      <div className="flex  items-center justify-between">
        <div>
          {" "}
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div>
          {" "}
          <p className="text-gray-500">Welcome back!</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
