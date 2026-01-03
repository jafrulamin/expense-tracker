import { NextResponse } from "next/server";
import { db, users } from "@/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const TEST_EMAIL = "test@test.com";
const TEST_PASSWORD = "test1234";
const TEST_NAME = "Test Account";

export async function POST() {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, TEST_EMAIL))
      .limit(1);

    const hashedPassword = await bcrypt.hash(TEST_PASSWORD, 10);

    if (existingUser.length > 0) {
      await db
        .update(users)
        .set({
          password: hashedPassword,
          name: TEST_NAME,
        })
        .where(eq(users.email, TEST_EMAIL));
    } else {
      await db.insert(users).values({
        email: TEST_EMAIL,
        password: hashedPassword,
        name: TEST_NAME,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ensure test account error:", error);
    return NextResponse.json(
      { error: "Failed to ensure test account" },
      { status: 500 }
    );
  }
}

