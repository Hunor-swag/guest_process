"use client";

import { Guest } from "@/types/typings";
import React, { SetStateAction, useEffect, useState } from "react";
import TableRow from "./TableRow";
import Link from "next/link";
import TableRowMobile from "./TableRowMobile";

type Props = {
  data: Guest[];
};

export default function DataTable({ data }: Props) {
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
            return <TableRow guest={guest} key={index} />;
          })}
        </tbody>
      </table>
      <div className="md:hidden block">
        {data.map((guest: Guest, index: number) => {
          return (
            <div key={index}>
              <ul className="bg-gray-200 p-3 my-2 rounded-xl text-sm space-y-1">
                <TableRowMobile titleText="Name:" contentText={guest.name} />
                <TableRowMobile titleText="Email:" contentText={guest.email} />
                <TableRowMobile
                  titleText="Address:"
                  contentText={guest.address}
                />
                <TableRowMobile
                  titleText="ID Number:"
                  contentText={guest.id_number}
                />
                <Link href={`/user/guests_data/${guest.id}`}>
                  <button className="btn bg-red-500 mt-2 w-full">Edit</button>
                </Link>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
