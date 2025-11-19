'use client';

import { useState } from 'react';
import Header from './Header';
import ExpenseSummary from './ExpenseSummary';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import type { Expense } from '../types';

const initialExpenses: Expense[] = [
  {
    id: 1,
    description: 'Grocery Shopping',
    amount: 52.30,
    category: 'Food',
    date: '2025-11-15',
  },
  {
    id: 2,
    description: 'Gas',
    amount: 45.00,
    category: 'Transportation',
    date: '2025-11-16',
  },
  {
    id: 3,
    description: 'Coffee',
    amount: 5.50,
    category: 'Food',
    date: '2025-11-18',
  },
];

export default function ExpenseApp() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const handleAddExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      id: Date.now(),
      ...expenseData,
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-start justify-center py-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-4 sm:p-6 space-y-4">
        <Header />
        <ExpenseSummary expenses={expenses} />
        <ExpenseForm onAddExpense={handleAddExpense} />
        <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
      </div>
    </div>
  );
}

