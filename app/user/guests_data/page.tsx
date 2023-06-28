"use client";

import Panel from "@/components/Panel";
import { useGlobalContext } from "@/components/context/GlobalContextProvider";
import AddGuestModal from "@/components/guests_data/AddGuestModal";
import DataTable from "@/components/guests_data/DataTable";
import { Guest } from "@/types/typings";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function GuestsData() {
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);

  const context = useGlobalContext();

  const [guests, setGuests] = useState<Guest[] | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  async function refreshData() {
    try {
      const res = await fetch(
        `https://${context?.hotel_object?.subdomain}.putboot.dev/api/guests`,
        {
          cache: "no-store",
        }
      );
      const json = await res.json();
      console.log(json);
      setGuests(json.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    refreshData();
    if (guests !== null) setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!guests) {
    return <div>No guests found</div>;
  }
  return (
    <Panel
      bgcolor="white"
      height="full"
      title="Guests"
      width="full"
      buttonText="Add Guest"
      buttonClickHandler={() => setShowAddGuestModal(true)}
    >
      <DataTable data={guests} />
      <AddGuestModal open={showAddGuestModal} setOpen={setShowAddGuestModal} />
    </Panel>
  );
}
