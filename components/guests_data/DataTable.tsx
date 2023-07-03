"use client";

import { Guest } from "@/types/typings";
import React, { SetStateAction, useEffect, useState } from "react";
import TableRow from "./TableRow";
import Link from "next/link";
import TableRowMobile from "./TableRowMobile";
import MobileGuestDataTable from "./MobileGuestDataTable";

type Props = {
  data: Guest[];
  refreshData: () => void;
};

export default function DataTable({ data, refreshData }: Props) {
  return (
    <div className="w-full">
      <table className="w-full bg-gray-200 rounded-xl table-auto hidden md:table">
        <thead>
          <tr>
            <th className="text-center p-2">Name</th>
            <th className="text-center p-2">Email</th>
            <th className="text-center p-2">Address</th>
            <th className="text-center p-2">ID number</th>
            <th className="text-center p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((guest: Guest, index: number) => {
            return (
              <TableRow guest={guest} key={index} refreshData={refreshData} />
            );
          })}
        </tbody>
      </table>
      <div className="md:hidden block">
        {data.map((guest: Guest, index: number) => {
          return (
            <MobileGuestDataTable
              guest={guest}
              key={index}
              refreshData={refreshData}
            />
          );
        })}
      </div>
    </div>
  );
}
