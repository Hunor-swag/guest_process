"use client";

import {
  BookOpenIcon,
  BuildingLibraryIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import SidebarItem from "./SidebarItem";
import SidebarTitle from "./SidebarTitle";
import useDictionary from "@/hooks/useDictionary";

export default function SidebarMenu({
  showSidebar,
  toggleMobileSidebar = () => {},
}: {
  showSidebar: boolean;
  toggleMobileSidebar?: () => void;
}) {
  const dict = useDictionary();

  return (
    <ul className={`pl-2 pr-5 text-gray-400`}>
      <SidebarItem
        showText={showSidebar}
        Icon={UserIcon}
        text={dict.userSidebar.profile}
        href="/user/profile"
        toggleMobileSidebar={toggleMobileSidebar}
      />
      <SidebarItem
        Icon={BookOpenIcon}
        href="/user/guests"
        showText={showSidebar}
        text={dict.userSidebar.guests}
        toggleMobileSidebar={toggleMobileSidebar}
      />
    </ul>
  );
}
