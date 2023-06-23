"use client";

import Header from "@/components/header/Header";
import MobileSidebar from "@/components/mobile_sidebar/MobileSidebar";
import Sidebar from "@/components/sidebar/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UserInterfaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [displaySidebar, setDisplaySidebar] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/auth/sign-in");
    }
  }, []);

  return session ? (
    <div>
      <Sidebar displayed={displaySidebar} setDisplayed={setDisplaySidebar} />
      <MobileSidebar />
      <div
        className={`h-screen
        ${displaySidebar ? "lg:pl-[200px]" : "lg:pl-[80px]"}
      `}
      >
        <Header isSidebarDisplayed={displaySidebar} />
        <div className="pt-16 w-full h-full bg-gradient-to-b from-gray-400 to-gray-100">
          <div className="w-full lg:p-8 p-2">{children}</div>
        </div>
      </div>
    </div>
  ) : (
    <div>You don't have permission to the user interface. Please sign in.</div>
  );
}
