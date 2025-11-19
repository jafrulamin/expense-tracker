'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Header from './Header';
import ExpenseSummary from './ExpenseSummary';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import type { Expense } from '../types';

interface ExpenseAppProps {
  userEmail: string;
}

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

export default function ExpenseApp({ userEmail }: ExpenseAppProps) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const handleAddExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      id: Date.now(),
      ...expenseData,
      userEmail,
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-start justify-center py-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-4 sm:p-6 space-y-4">
        <div className="flex justify-between items-center mb-2 pb-2 border-b">
          <div>
            <p className="text-sm text-gray-600">
              Signed in as: <span className="font-semibold">{userEmail}</span>
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
          >
            Sign Out
          </button>
        </div>
        <Header />
        <ExpenseSummary expenses={expenses} />
        <ExpenseForm onAddExpense={handleAddExpense} />
        <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
      </div>
    </div>
  );
}

