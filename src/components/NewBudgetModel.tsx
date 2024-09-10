"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import GroupField from "./GroupField";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Button from "./Button";
import Loader from "./Loader";
import EmojiPicker from "emoji-picker-react";
import { Budgets } from "../../utils/scheme";
import { db } from "../../utils/dbConfig";
import { toast } from "sonner";
import { eq } from "drizzle-orm";

interface Budget {
  id: number;
  name: string;
  amount: string;
  icon: string | null;
  createdBy: string;
  totalSpend: number;
  totalItem: number;
}
interface NewBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleBudgetUpdate: () => void;
  budgetsData?: Budget;
}

interface FormValues {
  budgetName: string;
  budgetPrice: string;
}

const NewBudgetModal: React.FC<NewBudgetModalProps> = ({
  isOpen,
  onClose,
  handleBudgetUpdate,
  budgetsData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string | null>(
    budgetsData ? budgetsData?.icon : "🥰"
  );

  if (!isOpen) return null;

  const initialValues: FormValues = {
    budgetName: budgetsData?.name || "",
    budgetPrice: budgetsData?.amount || "",
  };

  const validationSchema = Yup.object({
    budgetName: Yup.string().required("Budget name is required"),
    budgetPrice: Yup.number().required("Budget price is required"),
  });

  const handleAddBudget = async (values: FormValues) => {
    setLoading(true);
    try {
      const result = await db
        .insert(Budgets)
        .values({
          name: values.budgetName,
          amount: values.budgetPrice,
          createdBy: "abubakar",
          icon: emoji,
        })
        .returning({ inseredId: Budgets.id });
      if (result) {
        toast("New Budget created !!");
        handleBudgetUpdate();
        onClose();
      }
    } catch (error) {
      toast(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values:FormValues) => {
    setLoading(true);
    try{
      const result  = await db.update(Budgets).set({
        name: values.budgetName,
        amount: values.budgetPrice,
        icon: emoji,
      }).where(eq(Budgets.id,budgetsData.id)).returning();
      if (result) {
        toast("Budget updated !!");
        handleBudgetUpdate();
        onClose();
      }
    } catch(err){
      toast(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
   
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={budgetsData ? handleUpdate : handleAddBudget}
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
              <div className="w-full py-2">
                <button
                  type="button"
                  onClick={() => setEmojiOpen(!emojiOpen)}
                  className={` ring-1 rounded text-white text-lg py-2 px-8  mt-4 relative h-10 shadow cursor-pointer bg-slate-50 `}
                >
                  {emoji}
                </button>
                <div className="absolute bg-slate-100  z-50">
                  <EmojiPicker
                    open={emojiOpen}
                    onEmojiClick={(e) => {
                      setEmoji(e.emoji);
                      setEmojiOpen(false);
                    }}
                  />
                </div>
              </div>

              <GroupField
                label="Budget Name"
                name="budgetName"
                id="budgetName"
                type="text"
                placeholder="e.g Shopping"
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
                placeholder="e.g $500"
                value={values.budgetPrice}
                onChange={handleChange}
                error={
                  touched.budgetPrice && errors.budgetPrice
                    ? errors.budgetPrice
                    : ""
                }
              />

              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader />
                ) : (
                  `${budgetsData ? "Update Budget" : "Create Budget"}`
                )}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewBudgetModal;
