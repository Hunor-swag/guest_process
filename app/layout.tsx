import { getServerSession } from "next-auth";
import "./globals.css";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SessionProvider } from "next-auth/react";
import NextAuthProvider from "./NextAuthProvider";
import { GlobalContextProvider } from "@/components/context/GlobalContextProvider";
import HotelSystemProvider from "./HotelSystemProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // console.log(session);

  return (
    <html>
      <body>
        <GlobalContextProvider>
          <NextAuthProvider session={session}>
            <HotelSystemProvider>{children}</HotelSystemProvider>
          </NextAuthProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
