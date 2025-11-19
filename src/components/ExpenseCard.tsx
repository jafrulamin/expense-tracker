/*
  TypeScript notes:
  - ExpenseCardProps interface defines the props contract.
  - We use union type ExpenseCategory for safe categories.
  - Optional props (onDelete, highlighted, showCategory) with defaults.
*/

import { ExpenseCategory } from '../types';

export interface ExpenseCardProps {
  id: number;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  onDelete?: (id: number) => void;
  highlighted?: boolean;
  showCategory?: boolean;
}

function ExpenseCard({
  id,
  description,
  amount,
  category,
  date,
  onDelete,
  highlighted = false,
  showCategory = true,
}: ExpenseCardProps) {
  return (
    <div className={`expense-card ${highlighted ? 'highlighted' : ''}`}>
      <div className="expense-details">
        <h3>{description}</h3>
        {showCategory && <p className="category">{category}</p>}
        <p className="date">{date}</p>
      </div>
      <div className="expense-amount">
        <span>${amount.toFixed(2)}</span>
        {onDelete && (
          <button onClick={() => onDelete(id)} className="delete-btn">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default ExpenseCard;
