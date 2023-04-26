import Link from "next/link";
import React from "react";

export default function Auth() {
  return (
    <div className="w-full text-center">
      <h1 className="text-lg font-semibold">Please sign in!</h1>
      <Link className="link" href="/auth/sign-in">
        Sign in
      </Link>
    </div>
  );
}
