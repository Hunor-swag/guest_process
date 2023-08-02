import { getServerSession } from "next-auth";
import "./globals.css";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NextAuthProvider from "./NextAuthProvider";
import GlobalContextProvider from "@/components/context/GlobalContextProvider";
import HotelSystemProvider from "./HotelSystemProvider";

async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // console.log(session);

  return (
    <html>
      <body>
        <h1>hello</h1>
        {/* <GlobalContextProvider> */}
        {/* <NextAuthProvider session={session}>
          <HotelSystemProvider>{children}</HotelSystemProvider>
        </NextAuthProvider> */}
        {/* </GlobalContextProvider> */}
      </body>
    </html>
  );
}

export default RootLayout;
