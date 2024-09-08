"use client";

import Breadcrumb from "@/components/Breadcrumb";
import React from "react";

const Upgrade = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center py-4 gap-2">
        <h1 className="text-3xl font-semibold">Upgrade</h1>
        <Breadcrumb name={"Upgrade"} link={"upgrade"} />
      </div>
    </div>
  );
};

export default Upgrade;
