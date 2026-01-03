"use client";

import { ReactNode, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type AuthGateProps = {
  children: ReactNode;
};

export default function AuthGate({ children }: AuthGateProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div>
      <div className="bg-transparent border-b border-gray-200 px-4 py-2 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Signed in as: <span className="font-semibold">{session.user.email}</span>
        </span>
        <button
          onClick={() => signOut()}
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          Sign out
        </button>
      </div>
      {children}
    </div>
  );
}
