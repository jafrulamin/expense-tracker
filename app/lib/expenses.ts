import { db, expenses } from "@/db";
import { eq } from "drizzle-orm";
import type { Expense, ExpenseCategory } from "@/app/types";

export async function getExpensesForUser(email: string): Promise<Expense[]> {
  const rows = await db.select().from(expenses).where(eq(expenses.userEmail, email));
  return rows.map((row) => ({
    id: row.id,
    description: row.description,
    amount: Number(row.amount),
    category: row.category as ExpenseCategory,
    date: row.date.toISOString(),
    receiptUrl: row.receiptUrl ?? undefined,
  }));
}

export async function createExpenseForUser(
  email: string,
  data: {
    description: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
    receiptUrl?: string;
  }
): Promise<void> {
  await db.insert(expenses).values({
    userEmail: email,
    description: data.description,
    amount: data.amount.toString(),
    category: data.category,
    date: new Date(data.date),
    receiptUrl: data.receiptUrl ?? null,
  });
}

export async function deleteExpenseForUser(email: string, id: number): Promise<void> {
  await db
    .delete(expenses)
    .where(eq(expenses.id, id))
    .where(eq(expenses.userEmail, email));
}

