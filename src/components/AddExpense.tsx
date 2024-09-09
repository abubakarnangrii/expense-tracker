"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import GroupField from "./GroupField";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Button from "./Button";
import Loader from "./Loader";
import EmojiPicker from "emoji-picker-react";
import { Budgets, Expenses } from "../../utils/scheme";
import { db } from "../../utils/dbConfig";
import { toast } from "sonner";
import moment from "moment";

interface FormValues {
  expenseName: string;
  expensePrice: string;
}

interface AddExpenseProps{ 
  budgetId: number; 
  refreshBudget: () => void ;
  refreshExpanses: () => void ;
}

const AddExpense: React.FC<AddExpenseProps> = ({
  budgetId,
  refreshBudget,
  refreshExpanses
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: FormValues = {
    expenseName: "",
    expensePrice: "",
  };

  const validationSchema = Yup.object({
    expenseName: Yup.string().required("Expense name is required"),
    expensePrice: Yup.number().required("Expense price is required"),
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: values.expenseName,
          amount: values.expensePrice,
          budgetId: budgetId,
          createdAt: moment().format('DD/MM/YYYY'),
        })
        .returning({ inseredId: Budgets.id });
      if (result) {
        console.log(JSON.stringify(result));
        toast("New Expense created");
        refreshBudget();
        refreshExpanses();
        (values.expenseName = ""), (values.expensePrice = "");
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
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddExpense;
