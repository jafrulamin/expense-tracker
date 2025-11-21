"use client";

import { ReactNode } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type AuthGateProps = {
  children: ReactNode;
};

export default function AuthGate({ children }: AuthGateProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Please sign in to use the Expense Tracker.</p>
        <button
          onClick={() => signIn("github")}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ padding: "0.5rem 1rem", borderBottom: "1px solid #ddd" }}>
        <span style={{ marginRight: "1rem" }}>
          Signed in as: {session.user.email}
        </span>
        <button
          onClick={() => signOut()}
          style={{ padding: "0.25rem 0.75rem" }}
        >
          Sign out
        </button>
      </div>
      {children}
    </div>
  );
}

