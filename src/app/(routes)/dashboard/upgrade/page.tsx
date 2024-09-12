"use client";

import Breadcrumb from "@/components/Breadcrumb";
import React, { useState } from "react";
import Button from "@/components/Button";
import { toast } from "sonner";

// Define your upgrade options or plans here
const upgradePlans = [
  { id: 1, name: "Basic Plan", description: "Suitable for individual use.", price: "$10/month" },
  { id: 2, name: "Standard Plan", description: "Ideal for small teams.", price: "$25/month" },
  { id: 3, name: "Premium Plan", description: "Perfect for large organizations.", price: "$50/month" },
];

const Upgrade = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const handleUpgrade = () => {
    if (selectedPlan !== null) {
      toast(`Upgraded to plan ${selectedPlan}`);
      // Add logic for handling the upgrade process here
    } else {
      toast("Please select a plan to upgrade.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center py-4 gap-2">
        <h1 className="text-3xl font-semibold">Upgrade</h1>
        <Breadcrumb name={"Upgrade"} link={"upgrade"} />
      </div>

      <div className="py-4">
        <h2 className="text-xl font-semibold mb-4">Choose Your Plan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upgradePlans.map((plan) => (
            <div
              key={plan.id}
              className={`p-4 border rounded-lg shadow-sm ${
                selectedPlan === plan.id ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="text-gray-700">{plan.description}</p>
              <p className="text-xl font-bold mt-2">{plan.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center py-4">
        <Button onClick={handleUpgrade} disabled={selectedPlan === null}>
          Upgrade Now
        </Button>
      </div>
    </div>
  );
};

export default Upgrade;
