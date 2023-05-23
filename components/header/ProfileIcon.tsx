"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import LanguageSelectorMenu from "../LanguageSelectorMenu";
import { useDictionary } from "@/hooks/useDictionary";

function ProfileIcon() {
  const dict = useDictionary();
  const [isOpen, setIsOpen] = useState(false);
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="p-2 h-10 flex justify-center items-center rounded-md hover:bg-slate-200 hover:text-[#009ef7]"
    >
      <UserIcon className="w-8 h-8" onMouseOver={handleMouseEnter} />
      <div
        className={`bg-transparent right-4 w-56 absolute bg-gray-800 rounded-lg z-20 top-12 pt-4 flex flex-col space-y-5 text-slate-300 font-semibold ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <ul
          onMouseOver={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`${
            isOpen ? "block" : "hidden"
          } w-full bg-gray-800 rounded-lg right-0 z-20 top-16 p-5 flex flex-col space-y-5 text-slate-300 font-semibold`}
        >
          <div className="w-full flex justify-between">
            <div className="w-1/2">
              <UserIcon className="w-16 h-16" />
            </div>
            <div className="w-1/2 flex flex-col items-end">
              <span>Username...</span>
              <span>Email...</span>
            </div>
          </div>
          <Link className="hver:text-[#009ef7]" href="/user/profile">
            <li>{dict.userHeader.myProfile}</li>
          </Link>
          <Link className="hver:text-[#009ef7]" href="/user/#">
            <li>{dict.userHeader.signOut}</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default ProfileIcon;
