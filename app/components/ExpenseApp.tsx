"use client";

import { useEffect, useState, FormEvent } from "react";
import Header from "./Header";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import type { Expense } from "@/app/types";

type ExpenseAppProps = {
  initialExpenses?: Expense[];
};

export default function ExpenseApp({ initialExpenses = [] }: ExpenseAppProps) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  async function refreshExpenses() {
    const res = await fetch("/api/expenses");
    if (!res.ok) return;
    const data: Expense[] = await res.json();
    setExpenses(data);
  }

  useEffect(() => {
    if (initialExpenses.length === 0) {
      refreshExpenses();
    }
  }, []);

  async function handleAddExpense(expenseData: Omit<Expense, "id">) {
    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expenseData),
    });

    if (res.ok) {
      await refreshExpenses();
    } else {
      console.error("Failed to create expense");
    }
  }

  async function handleEdit(id: number, expenseData: Omit<Expense, "id">) {
    const res = await fetch(`/api/expenses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expenseData),
    });

    if (res.ok) {
      await refreshExpenses();
    } else {
      console.error("Failed to update expense");
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
    if (res.ok) {
      await refreshExpenses();
    } else {
      console.error("Failed to delete expense");
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-3xl p-4 sm:p-6 space-y-4">
          <Header />
          <ExpenseSummary expenses={expenses} />
          <ExpenseForm onAddExpense={handleAddExpense} />
          <ExpenseList expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
