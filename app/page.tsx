import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/config";
import { getExpensesForUser } from "@/app/lib/expenses";
import AuthGate from "./components/AuthGate";
import ExpenseApp from "./components/ExpenseApp";
import type { Expense } from "./types";

export default async function Page() {
  const session = await getServerSession(authOptions);

  let initialExpenses: Expense[] = [];
  if (session?.user?.email) {
    initialExpenses = await getExpensesForUser(session.user.email);
  }

  return (
    <AuthGate>
      <ExpenseApp initialExpenses={initialExpenses} />
    </AuthGate>
  );
}
