import { getServerSession } from "next-auth";
import "./globals.css";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NextAuthProvider from "./NextAuthProvider";
import { subdomainToDatabaseName } from "@/functions/subdomainAndDatabaseNameFunctions";

import { useHotelSystem } from "@/store/store";
import HotelSystemInitializer from "@/components/HotelSystemInitializer";
import { headers } from "next/headers";
import SystemNotFound from "@/components/SystemNotFound";
import { HotelSystemObject } from "@/types/typings";

async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  const headersList = headers();
  const domain = headersList.get("x-forwarded-host") || "";
  // const protocol = headersList.get("x-forwarded-proto") || "";
  // const pathname = headersList.get("x-invoke-path") || "";
  const subdomain = domain.split(".")[0];

  useHotelSystem.setState({ subdomain: subdomain, domain: domain });

  const systemExists = async () => {
    const res = await fetch(
      `https://${useHotelSystem.getState().subdomain}.putboot.dev/api/systems`
    );
    const json = await res.json();
    if (
      !json.find((system: HotelSystemObject) => system.subdomain === subdomain)
    )
      return false;
    return true;
  };

  return (
    <html>
      <body>
        {!(await systemExists()) ? (
          <SystemNotFound />
        ) : (
          <>
            <HotelSystemInitializer subdomain={subdomain} domain={domain} />
            <NextAuthProvider session={session}>{children}</NextAuthProvider>
          </>
        )}
      </body>
    </html>
  );
}

export default RootLayout;
