import { getServerSession } from "next-auth";
import "./globals.css";
import Login from "@/components/Login";
import { authOptions } from "./api/auth/[...nextauth]/route";
<<<<<<< HEAD
import { SessionProvider } from "next-auth/react";
import NextAuthProvider from "./NextAuthProvider";
=======
import Provider from "./system/Provider";
import Icon from "@/images/icon.jpg";

export const metadata = {
  icons: {
    favicon: Icon,
  },
};
>>>>>>> 7bf0eb26a9886289a7cf69331781400627656bd0

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
