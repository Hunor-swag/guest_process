"use client";

import { Guest } from "@/types/typings";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  guest: Guest;
  refreshData: () => void;
};

export default function TableRow({ guest, refreshData }: Props) {
  const router = useRouter();
  const confirmDeleteGuest = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this guest?"
    );
    if (!confirmDelete) return;
    deleteGuest();
  };

  const deleteGuest = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guests/${guest.id}`, {
        method: "DELETE",
      });
      router.refresh();
      refreshData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <tr>
        <td className="text-center p-2">{guest.name}</td>
        <td className="text-center p-2">{guest.email}</td>
        <td className="text-center p-2">{guest.address}</td>
        <td className="text-center p-2">{guest.id_number}</td>
        <td className="text-center p-2 space-x-2">
          <Link href={`/user/guests_data/${guest.id}`}>
            <button className="btn px-2 py-1">Edit</button>
          </Link>
          <button onClick={confirmDeleteGuest} className="btn px-2 py-1">
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
