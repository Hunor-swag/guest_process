"use client";

import { useState } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import SidebarMenu from "./SidebarMenu";

type Props = {
  displayed: boolean;
  setDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ displayed, setDisplayed }: Props) {
  const [showSidebar, setShowSidebar] = useState(true);

  function handleSidebarChange(show: boolean) {
    if (displayed) return;
    setShowSidebar(show);
  }

  return (
    <>
      <div
        className={`fixed w-8 h-7 z-30 hidden lg:flex lg:justify-center lg:items-center rounded-lg overflow-hidden text-[#009ef7] bg-white cursor-pointer shadow-lg top-5 ease-in-out duration-200 ${
          showSidebar ? "left-[184px]" : "left-[64px]"
        }
        ${displayed && "rotate-180"}
        `}
        onClick={() => setDisplayed(!displayed)}
        onMouseEnter={() => handleSidebarChange(true)}
        onMouseLeave={() => handleSidebarChange(false)}
      >
        <ChevronDoubleRightIcon className="w-5 h-5 hidden lg:block" />
      </div>

      <div
        className={`hidden z-20 lg:block fixed top-0 left-0 bg-[#181C32] text-gray-400 h-full ease-in-out duration-200 
      ${showSidebar ? "w-[200px]" : "w-[80px]"}`}
        onMouseEnter={() => handleSidebarChange(true)}
        onMouseLeave={() => handleSidebarChange(false)}
      >
        <div className="flex pl-3 items-center h-16 border-b border-dashed border-b-slate-500 w-full">
          LOGO
        </div>
        <SidebarMenu showSidebar={showSidebar} />
      </div>
    </>
  );
}
