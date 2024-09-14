'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SideNav from '../../../components/SideNav';
import DashboardHeader from '@/components/DashboardHeader';
import { db } from '../../../../utils/dbConfig';
import { eq } from 'drizzle-orm';
import { Budgets } from '../../../../utils/scheme';
import Loader from '@/app/loading'; // Import the Loader component

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const storedUser = localStorage.getItem('userEmail');
    if (!storedUser) {
      router.replace('/sign-in');
      return;
    }
    setUser(storedUser);
  }, [router]);

  useEffect(() => {
    if (user) {
      createUserBudget();
    }
  }, [user]);

  const createUserBudget = async () => {
    try {
      if (!user) return;
      const result = await db
        .select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, user));

      if (result?.length === 0) {
        router.replace('/dashboard/budgets');
      } else {
        router.replace('/dashboard');
      }
    } catch (error) {
      console.error('Failed to fetch budgets:', error);
    } finally {
      setLoading(false); // Set loading to false after operation completes
    }
  };

  if (loading) {
    return <Loader />; // Render the Loader while loading
  }

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
