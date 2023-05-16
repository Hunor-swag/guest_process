"use client";

import { BoltIcon, UserIcon } from "@heroicons/react/24/outline";
import HeaderIcon from "./HeaderIcon";
import HeaderItem from "./HeaderItem";
import ProfileIcon from "./ProfileIcon";
import { useDictionary } from "@/hooks/useDictionary";

export default function Header({
  isSidebarDisplayed,
}: {
  isSidebarDisplayed: boolean;
}) {
  const dict = useDictionary();

  return (
    <>
      <header
        className={`right-0 fixed z-0 flex justify-between p-4 h-16 text-gray-400 w-full bg-white
        lg:pl-[${isSidebarDisplayed ? "200px" : "80px"}]
      `}
      >
        <div className="flex lg:hidden items-center justify-center w-full">
          <div>LOGO</div>
        </div>
        <div className="hidden lg:flex pl-10 justify-start items-center space-x-2">
          {/* TODO: which item is selected? */}
          <HeaderItem text={dict.userHeader.home} href="/user/#" />
          <HeaderItem text={dict.userHeader.guests} href="/user/guests_data" />
        </div>
        <div className="flex space-x-2 items-center">
          <HeaderIcon Icon={BoltIcon} />
          <ProfileIcon />
        </div>
      </header>
    </>
  );
}
