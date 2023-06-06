"use client";

import { Bars3Icon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SidebarItem from "../sidebar/SidebarItem";
import SidebarMenu from "../sidebar/SidebarMenu";

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed z-20 top-4 left-4 lg:hidden w-8 h-8 text-gray-400">
        <Bars3Icon
          className="w-8 h-8 cursor-pointer"
          onClick={handleSidebarToggle}
        />
      </div>
      <div
        className={`lg:hidden w-56 h-full z-30 pt-16 fixed top-0 left-0 bg-[#181C32] ease-in-out duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <button
          className={`fixed top-4 left-44 ${isOpen ? "block" : "hidden"} `}
          onClick={handleSidebarToggle}
        >
          <XCircleIcon className="w-8 h-8 text-gray-500" />
        </button>
        <SidebarMenu
          showSidebar={isOpen}
          toggleMobileSidebar={handleSidebarToggle}
        />
      </div>
    </>
  );
}
