import { getServerSession } from "next-auth";
import "./globals.css";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NextAuthProvider from "./NextAuthProvider";

import { useHotelSystem } from "@/store/store";
import HotelSystemInitializer from "@/components/HotelSystemInitializer";
import { headers } from "next/headers";

async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  const headersList = headers();
  const domain = headersList.get("x-forwarded-host") || "";
  // const protocol = headersList.get("x-forwarded-proto") || "";
  // const pathname = headersList.get("x-invoke-path") || "";
  const subdomain = domain.split(".")[0];

  useHotelSystem.setState({ subdomain: subdomain, domain: domain });

  return (
    <html>
      <body>
        <HotelSystemInitializer subdomain={subdomain} domain={domain} />
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
