import ExpenseCard from './ExpenseCard';
import type { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit?: (id: number, data: Omit<Expense, 'id'>) => void;
  onDelete?: (id: number) => void;
}

export default function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <p className="text-center text-gray-500 py-8">No expenses yet</p>;
  }

  return (
    <div className="space-y-2">
      {expenses.map((expense, index) => (
        <ExpenseCard
          key={expense.id}
          id={expense.id}
          description={expense.description}
          amount={expense.amount}
          category={expense.category}
          date={expense.date}
          receiptUrl={expense.receiptUrl}
          onEdit={onEdit}
          onDelete={onDelete}
          highlighted={index === 0}
        />
      ))}
    </div>
  );
}

