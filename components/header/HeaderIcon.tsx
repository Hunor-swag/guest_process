"use client";

import React from "react";
type Props = {
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
};

function HeaderIcon({ Icon }: Props) {
  return (
    <div className="p-2 h-10 flex justify-center items-center rounded-md hover:bg-slate-200 hover:text-[#009ef7]">
      <Icon className="w-8 h-8" />
    </div>
  );
}

export default HeaderIcon;
