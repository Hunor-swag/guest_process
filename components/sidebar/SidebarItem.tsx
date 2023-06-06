"use client";

import Link from "next/link";

type Props = {
  showText: boolean;
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
  href: string;
  toggleMobileSidebar?: () => void;
};

export default function SidebarItem({
  Icon,
  showText,
  text,
  href,
  toggleMobileSidebar = () => {},
}: Props) {
  return (
    <Link href={href} onClick={toggleMobileSidebar}>
      <li
        className={`overflow-hidden flex items-center rounded-md h-8 p-1 ml-3 my-5 cursor-pointer hover:text-white
      ${showText ? "w-[160px]" : "w-8"}
    `}
      >
        <Icon className="w-5 h-5 opacity-100" />
        <span
          className={`whitespace-nowrap text-xs font-bold transition-opacity ease-in-out duration-200 opacity-0 ${
            showText && "opacity-100 ml-2 "
          }`}
        >
          {showText && text}
        </span>
      </li>
    </Link>
  );
}
