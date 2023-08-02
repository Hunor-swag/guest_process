import React from "react";

export default function TableHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="text-slate-700 font-semibold uppercase text-xs py-3 text-left pr-6 pl-3">
      {children}
    </th>
  );
}
