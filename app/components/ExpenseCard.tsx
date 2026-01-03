'use client';

import { useState } from 'react';
import type { ExpenseCategory, Expense } from '../types';

export interface ExpenseCardProps {
  id: number;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  receiptUrl?: string;
  onDelete?: (id: number) => void;
  onEdit?: (id: number, data: Omit<Expense, 'id'>) => void;
  highlighted?: boolean;
}

export default function ExpenseCard({
  id,
  description,
  amount,
  category,
  date,
  receiptUrl,
  onDelete,
  onEdit,
  highlighted = false,
}: ExpenseCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(description);
  const [editAmount, setEditAmount] = useState(amount.toString());
  const [editCategory, setEditCategory] = useState<ExpenseCategory>(category);
  const [editDate, setEditDate] = useState(date.slice(0, 10));
  const [editReceiptUrl, setEditReceiptUrl] = useState(receiptUrl || '');

  const handleSave = () => {
    if (!editDescription || !editAmount || !editCategory || !editDate) {
      alert('Please fill in all required fields');
      return;
    }
    if (onEdit) {
      onEdit(id, {
        description: editDescription,
        amount: Number(editAmount),
        category: editCategory,
        date: editDate,
        receiptUrl: editReceiptUrl || undefined,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditDescription(description);
    setEditAmount(amount.toString());
    setEditCategory(category);
    setEditDate(date.slice(0, 10));
    setEditReceiptUrl(receiptUrl || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div
        className={`flex flex-col gap-2 rounded-md p-3 shadow-sm bg-blue-500 ${
          highlighted ? 'border-2 border-blue-600' : 'border border-blue-400'
        }`}
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs text-blue-100">Description</label>
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-blue-100">Amount</label>
          <input
            type="number"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
            step="0.01"
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-blue-100">Category</label>
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value as ExpenseCategory)}
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-blue-100">Date</label>
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-blue-100">Receipt URL (Optional)</label>
          <input
            type="text"
            value={editReceiptUrl}
            onChange={(e) => setEditReceiptUrl(e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleCancel}
            className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex justify-between items-start rounded-md p-3 shadow-sm bg-blue-500 ${
        highlighted ? 'border-2 border-blue-600' : 'border border-blue-400'
      }`}
    >
      <div className="flex-1">
        <h3 className="font-semibold text-white">{description}</h3>
        <p className="text-sm text-blue-100">{category}</p>
        <p className="text-xs text-blue-100">{date.slice(0, 10)}</p>
        {receiptUrl && (
          <a
            href={receiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-200 hover:text-white hover:underline mt-1 inline-block"
          >
            View receipt
          </a>
        )}
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-lg font-bold text-white">${amount.toFixed(2)}</span>
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
