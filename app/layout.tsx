import { getServerSession } from "next-auth";
import "./globals.css";
import Login from "@/components/Login";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SessionProvider } from "next-auth/react";
import Provider from "./system/Provider";
import Icon from "@/images/icon.jpg";

export const metadata = {
  icons: {
    favicon: Icon,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
