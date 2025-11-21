"use client";

import { useEffect, useState, FormEvent } from "react";
import type { Expense, ExpenseCategory } from "@/app/types";

type ExpenseAppProps = {
  initialExpenses?: Expense[];
};

const CATEGORIES: ExpenseCategory[] = ["Food", "Transportation", "Entertainment", "Other"];

export default function ExpenseApp({ initialExpenses = [] }: ExpenseAppProps) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("Food");
  const [date, setDate] = useState("");

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!description || !amount || !date) return;

    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        amount: Number(amount),
        category,
        date,
      }),
    });

    if (res.ok) {
      setDescription("");
      setAmount("");
      setDate("");
      await refreshExpenses();
    } else {
      console.error("Failed to create expense");
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
    <main style={{ padding: "1.5rem", maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>Expense Tracker</h1>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value as ExpenseCategory)}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit" style={{ marginTop: "0.5rem" }}>
            Add Expense
          </button>
        </form>
      </section>

      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Expenses</h2>
          <button onClick={refreshExpenses}>Refresh</button>
        </div>
        {expenses.length === 0 ? (
          <p>No expenses yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, marginTop: "0.5rem" }}>
            {expenses.map((exp) => (
              <li
                key={exp.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <div>
                  <div>{exp.description}</div>
                  <div style={{ fontSize: "0.9rem", color: "#555" }}>
                    ${exp.amount.toFixed(2)} • {exp.category} • {exp.date.slice(0, 10)}
                  </div>
                </div>
                <button onClick={() => handleDelete(exp.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
