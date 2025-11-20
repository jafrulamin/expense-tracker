'use client';

import { useState, useEffect, useMemo } from 'react';
import { signOut } from 'next-auth/react';
import Header from './Header';
import ExpenseSummary from './ExpenseSummary';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseFilters from './ExpenseFilters';
import type { Expense } from '../types';

interface ExpenseAppProps {
  userEmail: string;
}

export default function ExpenseApp({ userEmail }: ExpenseAppProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  // Fetch expenses from database
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses');
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort expenses
  const filteredAndSortedExpenses = useMemo(() => {
    let filtered = expenses;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((expense) => expense.category === selectedCategory);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    return sorted;
  }, [expenses, selectedCategory, sortBy]);

  const handleAddExpense = async (expenseData: Omit<Expense, 'id'>) => {
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        const newExpense = await response.json();
        setExpenses([newExpense, ...expenses]);
      } else {
        alert('Failed to add expense');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setExpenses(expenses.filter((expense) => expense.id !== id));
      } else {
        alert('Failed to delete expense');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense');
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-gray-600">Loading expenses...</p>
      </div>
    );
  }

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
        <ExpenseFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <ExpenseList 
          expenses={filteredAndSortedExpenses} 
          onDelete={handleDeleteExpense}
          showHighlight={selectedCategory === 'All' && sortBy === 'date-desc'}
        />
      </div>
    </div>
  );
}
