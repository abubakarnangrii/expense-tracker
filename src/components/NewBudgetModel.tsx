"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import GroupField from "./GroupField";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Button from "./Button";
import Loader from "./Loader";

interface NewBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  budgetName: string;
  budgetPrice: string;
  budgetEmoji: string;
}

const NewBudgetModal: React.FC<NewBudgetModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const initialValues: FormValues = {
    budgetName: "",
    budgetPrice: "",
    budgetEmoji: "",
  };

  const validationSchema = Yup.object({
    budgetName: Yup.string().required("Budget name is required"),
    budgetPrice: Yup.number().required("Budget price is required"),
    budgetEmoji: Yup.string().required("Budget emoji is required"),
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      // Simulate a network request or data submission
      await new Promise((resolve) => setTimeout(resolve, 10000));
      console.log(values);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false); // Ensure loading state is turned off
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
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 px-4">
            <div className="bg-white dark:bg-black p-4 rounded shadow-lg max-w-md mx-auto w-full relative">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">New Budget</h2>
                <X
                  onClick={onClose}
                  size="22"
                  className="bg-slate-50 hover:bg-primary/20 cursor-pointer rounded-full"
                />
              </div>
              <GroupField
                label="Budget Name"
                name="budgetName"
                id="budgetName"
                type="text"
                placeholder="Enter budget name"
                value={values.budgetName}
                onChange={handleChange}
                error={
                  touched.budgetName && errors.budgetName
                    ? errors.budgetName
                    : ""
                }
              />
              <GroupField
                label="Budget Price"
                name="budgetPrice"
                id="budgetPrice"
                type="number"
                placeholder="678"
                value={values.budgetPrice}
                onChange={handleChange}
                error={
                  touched.budgetPrice && errors.budgetPrice
                    ? errors.budgetPrice
                    : ""
                }
              />
              <GroupField
                label="Budget Emoji"
                name="budgetEmoji"
                id="budgetEmoji"
                type="text"
                placeholder="Enter emoji"
                value={values.budgetEmoji}
                onChange={handleChange}
                error={
                  touched.budgetEmoji && errors.budgetEmoji
                    ? errors.budgetEmoji
                    : ""
                }
              />
              <Button type="submit" disabled={loading}>
                {loading ? <Loader /> : "Create Budget"}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewBudgetModal;
