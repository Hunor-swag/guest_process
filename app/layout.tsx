import { getServerSession } from "next-auth";
import "./globals.css";
import Login from "@/components/Login";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SessionProvider } from "next-auth/react";
import NextAuthProvider from "./NextAuthProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <html>
      <body>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
