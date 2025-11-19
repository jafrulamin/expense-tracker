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
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !category || !date) {
      alert('Please fill in all required fields');
      return;
    }

    let receiptUrl: string | undefined;

    // Upload receipt if a file is selected
    if (receiptFile) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', receiptFile);

        const response = await fetch('/api/receipts', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload receipt');
        }

        const data = await response.json();
        receiptUrl = data.url;
      } catch (error) {
        console.error('Error uploading receipt:', error);
        alert('Failed to upload receipt. Expense will be added without receipt.');
      } finally {
        setUploading(false);
      }
    }

    // Add expense with or without receipt URL
    onAddExpense({
      description,
      amount: Number(amount),
      category,
      date,
      receiptUrl,
    });

    // Reset form
    setDescription('');
    setAmount('');
    setCategory('Food');
    setDate('');
    setReceiptFile(null);
  };

  return (
    <form className="space-y-2 bg-slate-50 rounded-md p-3" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Add New Expense</h2>
      
      <div className="flex flex-col gap-1">
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

      <div className="flex flex-col gap-1">
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

      <div className="flex flex-col gap-1">
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

      <div className="flex flex-col gap-1">
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

      <div className="flex flex-col gap-1">
        <label htmlFor="receipt" className="text-sm font-medium text-gray-700">
          Receipt (Optional)
        </label>
        <input
          type="file"
          id="receipt"
          accept="image/*,.pdf"
          onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {receiptFile && (
          <span className="text-xs text-gray-600">Selected: {receiptFile.name}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="mt-2 w-full sm:w-auto bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {uploading ? 'Uploading...' : 'Add Expense'}
      </button>
    </form>
  );
}
