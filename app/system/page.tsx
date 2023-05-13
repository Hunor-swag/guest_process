"use client";

import { signOut, useSession } from "next-auth/react";

function SystemPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col justify-center items-center h-full pt-10">
      <h1 className="text-xl">{session?.user?.name}</h1>
      <button
        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}

export default SystemPage;
