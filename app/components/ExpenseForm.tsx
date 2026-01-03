'use client';

import { useState } from 'react';
import type { Expense, ExpenseCategory } from '../types';

interface ExpenseFormProps {
  onAddExpense: (expenseData: Omit<Expense, 'id'>) => void;
}

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const [date, setDate] = useState('');
  const [receiptUrl, setReceiptUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !category || !date) {
      alert('Please fill in all required fields');
      return;
    }

    const payloadReceiptUrl = receiptUrl || null;

    // Add expense with optional receipt URL
    onAddExpense({
      description,
      amount: Number(amount),
      category,
      date,
      receiptUrl: payloadReceiptUrl ?? undefined,
    });

    // Reset form
    setDescription('');
    setAmount('');
    setCategory('Food');
    setDate('');
    setReceiptUrl('');
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <div className="bg-blue-100 rounded-md p-3">
        <h2 className="text-lg font-semibold text-gray-800">Add New Expense</h2>
      </div>
      
      <div className="flex flex-col gap-1 bg-blue-100 rounded-md p-3">
        <label htmlFor="description" className="text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1 bg-blue-100 rounded-md p-3">
        <label htmlFor="amount" className="text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          step="0.01"
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1 bg-blue-100 rounded-md p-3">
        <label htmlFor="category" className="text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 bg-blue-100 rounded-md p-3">
        <label htmlFor="date" className="text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1 bg-blue-100 rounded-md p-3">
        <label htmlFor="receiptUrl" className="text-sm font-medium text-gray-700">
          Receipt URL (Optional)
        </label>
        <input
          type="text"
          id="receiptUrl"
          placeholder="Receipt URL (optional)"
          value={receiptUrl}
          onChange={(e) => setReceiptUrl(e.target.value)}
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-2 w-full sm:w-auto bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}
