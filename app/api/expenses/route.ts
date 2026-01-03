import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/config";
import { getExpensesForUser, createExpenseForUser } from "@/app/lib/expenses";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const expenses = await getExpensesForUser(session.user.email);
  return NextResponse.json(expenses);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const { description, amount, category, date, receiptUrl } = body;

  if (!description || !amount || !category || !date) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  await createExpenseForUser(session.user.email, {
    description,
    amount: Number(amount),
    category,
    date,
    receiptUrl,
  });

  return new NextResponse("Created", { status: 201 });
}

