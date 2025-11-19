export type ExpenseCategory = 'Food' | 'Transportation' | 'Entertainment' | 'Other';

export type Expense = {
  id: number;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  receiptUrl?: string;
  userEmail?: string;
};

