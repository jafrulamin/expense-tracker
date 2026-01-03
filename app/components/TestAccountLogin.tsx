"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TEST_EMAIL = "test@test.com";
const TEST_PASSWORD = "test1234";

type TestAccountLoginProps = {
  className?: string;
};

export default function TestAccountLogin({ className }: TestAccountLoginProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleTestLogin() {
    setLoading(true);
    
    try {
      // Ensure test account exists with correct password
      await fetch("/api/auth/ensure-test-account", { method: "POST" });
      
      // Sign in with test credentials
      const result = await signIn("credentials", {
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Test login error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={className}>
      <p className="text-sm text-gray-600 mb-1">
        Or try the app without registering:
      </p>
      <button
        type="button"
        onClick={handleTestLogin}
        disabled={loading}
        className="w-full rounded-md border border-blue-600 bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : "Use Test Account"}
      </button>
    </div>
  );
}

