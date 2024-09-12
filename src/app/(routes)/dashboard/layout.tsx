"use client";

import SideNav from "../../../components/SideNav";
import DashboardHeader from "@/components/DashboardHeader";
import { db } from "../../../../utils/dbConfig";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { eq } from "drizzle-orm";
import { Budgets } from "../../../../utils/scheme"; 
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user, isLoaded } = useUser(); 

  useEffect(() => {
    if (isLoaded && user) {
      createUserBudget();
    }
  }, [isLoaded, user]); 

  const createUserBudget = async () => {
    try {
      const result = await db
        .select()
        .from(Budgets)
        .where(eq(Budgets.createdBy,"abubakar" ));
      if (result?.length === 0) {
        router.replace("/dashboard/budgets");
      }
    } catch (error) {
      console.error("Failed to fetch budgets:", error);
    }
  };

  return (
    <div className="flex justify-start items-start flex-row">
      <div className="fixed md:w-64 hidden md:block dark:bg-meta-4">
        <SideNav />
      </div>
      <div className="md:ml-64 dark:bg-meta-4 w-full">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
