"use client";

import { Guest } from "@/types/typings";
import Link from "next/link";

type Props = {
  guest: Guest;
};

export default function TableRow({ guest }: Props) {
  return (
    <tr>
      <td className="text-center p-2">{guest.name}</td>
      <td className="text-center p-2">{guest.email}</td>
      <td className="text-center p-2">{guest.address}</td>
      <td className="text-center p-2">{guest.id_number}</td>
      <td className="text-center p-2 space-x-2">
        <Link href={`/user/guests_data/${guest.id}`}>
          <button className="btn px-2 py-1">Edit</button>
        </Link>
        <button className="btn px-2 py-1">Delete</button>
      </td>
    </tr>
  );
}
