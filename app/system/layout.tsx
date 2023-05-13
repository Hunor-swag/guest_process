import React from "react";
import Provider from "./Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Login from "@/components/Login";

export default async function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Provider>{!session ? <Login /> : children}</Provider>
    </div>
  );
}
