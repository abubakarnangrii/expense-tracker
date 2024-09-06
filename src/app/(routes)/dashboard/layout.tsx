import type { Metadata } from "next";
import SideNav from "../../../components/SideNav";
import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
