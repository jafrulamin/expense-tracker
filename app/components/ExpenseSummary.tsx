import type { Expense } from '../types';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export default function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 bg-slate-50 rounded-md p-3">
      <div>
        <span className="text-sm text-gray-600">Total Expenses: </span>
        <span className="font-semibold text-gray-800">{expenses.length}</span>
      </div>
      <div>
        <span className="text-sm text-gray-600">Total Amount: </span>
        <span className="font-semibold text-gray-800">${totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
}

