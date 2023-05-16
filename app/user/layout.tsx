"use client";

import Header from "@/components/header/Header";
import MobileSidebar from "@/components/mobile_sidebar/MobileSidebar";
import Sidebar from "@/components/sidebar/Sidebar";
import { useState } from "react";

export default function UserInterfaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [displaySidebar, setDisplaySidebar] = useState(true);

  return (
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
          <div className="w-full md:p-8 p-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
