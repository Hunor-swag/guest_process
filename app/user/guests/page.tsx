"use client";

import { Guest } from "@/types/typings";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/components/context/GlobalContextProvider";
import AddGuestModal from "@/components/guests_data/AddGuestModal";

export default function DemoPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const context = useGlobalContext();

  const [showAddGuestModal, setShowAddGuestModal] = useState(false);

  async function getData() {
    try {
      const res = await fetch(
        `https://${context?.hotel_object?.subdomain}.putboot.dev/api/guests`,
        {
          cache: "no-store",
        }
      );
      const json = await res.json();

      setGuests(json.data);
      if (json.data !== null) setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const data = getData();

    console.log(guests);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={guests}
        setShowAddGuestModal={setShowAddGuestModal}
      />
      <AddGuestModal
        open={showAddGuestModal}
        setOpen={setShowAddGuestModal}
        refreshData={getData}
      />
    </div>
  );
}
