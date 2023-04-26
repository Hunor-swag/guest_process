"use client";

import Link from "next/link";

type Props = {
  text: string;
  href: string;
  isActive?: boolean;
};

export default function HeaderItem({ text, href, isActive }: Props) {
  return (
    <Link href={href}>
      <div
        className={`flex justify-center items-center font-semibold rounded-md text-sm px-2 h-10 bg-white hover:bg-slate-200 hover:text-[#009ef7] text-gray-800 ${
          isActive && "bg-slate-200 text-[#009ef7]"
        }`}
      >
        {text}
      </div>
    </Link>
  );
}
