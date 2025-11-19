import type { ExpenseCategory } from '../types';

export interface ExpenseCardProps {
  id: number;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  receiptUrl?: string;
  onDelete?: (id: number) => void;
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
  highlighted = false,
}: ExpenseCardProps) {
  return (
    <div
      className={`flex justify-between items-start bg-white rounded-md p-3 shadow-sm ${
        highlighted ? 'border-2 border-blue-500' : 'border border-slate-200'
      }`}
    >
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{description}</h3>
        <p className="text-sm text-gray-600">{category}</p>
        <p className="text-xs text-gray-500">{date}</p>
        {receiptUrl && (
          <a
            href={receiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline mt-1 inline-block"
          >
            📎 View Receipt
          </a>
        )}
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-lg font-bold text-gray-800">${amount.toFixed(2)}</span>
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
  );
}
