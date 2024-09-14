"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import GroupField from "./GroupField";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Button from "./Button";
import Loader from "./Loader";
import { Budgets, Expenses } from "../../utils/scheme";
import { db } from "../../utils/dbConfig";
import { toast } from "sonner";
import moment from "moment";
import { eq } from "drizzle-orm";

interface FormValues {
  expenseName: string;
  expensePrice: string;
}

interface Budget {
  id: number;
  name: string;
  amount: string; 
  icon: string | null;
  createdBy?: string;
  totalSpend?: number;
  totalItem?: number;
}

interface AddExpenseProps {
  budgetId: string|number;
  refreshBudget: () => void;
  refreshExpanses: () => void;
  budgetsData:Budget | undefined;
}

const AddExpense: React.FC<AddExpenseProps> = ({
  budgetId,
  refreshBudget,
  refreshExpanses,
  budgetsData,
}) => {
  const numericId = typeof budgetId === 'string' ? parseInt(budgetId, 10) : budgetId;
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initialValues: FormValues = {
    expenseName: "",
    expensePrice: "",
  };

  const validationSchema = Yup.object({
    expenseName: Yup.string().required("Expense name is required"),
    expensePrice: Yup.number()
      .required("Expense price is required")
      .positive("Expense price must be a positive number")
      .integer("Expense price must be an integer"),
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setErrorMessage(null); 
    try {
      const totalExpensesResult = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.budgetId, numericId));
        
      const currentTotalExpenses = totalExpensesResult.reduce(
        (total, expense) => total + parseFloat(expense.amount),
        0
      );
      const newExpenseAmount = parseFloat(values.expensePrice);
      const updatedTotalExpenses = currentTotalExpenses + newExpenseAmount;

      let amount = Number(budgetsData?.amount)
      if (updatedTotalExpenses > amount ) {
        setErrorMessage("Adding this expense would exceed the budget amount.");
        return; 
      }
      const result = await db
        .insert(Expenses)
        .values({
          name: values.expenseName,
          amount: values.expensePrice,
          budgetId: numericId,
          createdAt: moment().format('DD/MM/YYYY'),
        })
        .returning({ insertedId: Budgets.id });

      if (result) {
        console.log(JSON.stringify(result));
        toast("New Expense created");
        refreshBudget();
        refreshExpanses();
        values.expenseName = "";
        values.expensePrice = "";
      }
    } catch (error) {
      toast(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleChange, values }) => (
        <Form>
          <div className="bg-white dark:bg-black p-6 rounded ring-1 ring-slate-100 shadow-sm mx-auto w-full relative">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Add Expense</h2>
            </div>

            

            <GroupField
              label="Expense Name"
              name="expenseName"
              id="expenseName"
              type="text"
              placeholder="e.g Shopping"
              value={values.expenseName}
              onChange={handleChange}
              error={
                touched.expenseName && errors.expenseName
                  ? errors.expenseName
                  : ""
              }
            />
            <GroupField
              label="Expense Amount"
              name="expensePrice"
              id="expensePrice"
              type="number"
              placeholder="e.g $500"
              value={values.expensePrice}
              onChange={handleChange}
              error={
                touched.expensePrice && errors.expensePrice
                  ? errors.expensePrice
                  : ""
              }
              min={0}
            />

            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : "Add New Expense"}
            </Button>
            {errorMessage && (
              <div className="pb-2 pt-4 text-red-600">{errorMessage}</div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddExpense;
