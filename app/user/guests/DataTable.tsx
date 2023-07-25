"use client";

import { Guest } from "@/types/typings";
import TableCell from "./TableCell";
import TableHeader from "./TableHeader";
import { useState, useEffect } from "react";
import AddGuestModal from "./AddGuestModal";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useGuests, useHotelSystem } from "@/store/store";

export default function DataTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [showAddGuestModal, setShowAddGuestModal] = useState(false);

  const [displayedGuests, setDisplayedGuests] = useState<Guest[]>([]);

  const guests = useGuests((state) => state.guests);

  useEffect(() => {
    setDisplayedGuests(guests);
  }, [guests]);

  const handleRowSelect = (guestId: number) => {
    if (selectedRows.includes(guestId)) {
      setSelectedRows(selectedRows.filter((id) => id !== guestId));
    } else {
      setSelectedRows([...selectedRows, guestId]);
    }
  };

  const handleSelectAllRows = () => {
    if (selectedRows.length === guests?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(guests?.map((guest) => guest.id));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredGuests = guests?.filter((guest) =>
      guest.name.toLowerCase().includes(searchValue)
    );
    setDisplayedGuests(filteredGuests);
  };

  function noneSelected() {
    return selectedRows.length === 0;
  }

  function allSelected() {
    if (!displayedGuests) return false;
    return selectedRows.length === displayedGuests?.length;
  }

  // console.log("guests: ", guests);
  // console.log("displayed guests: ", displayedGuests);

  async function deleteGuests(indexes: number[]) {
    const subdomain = useHotelSystem.getState().subdomain;
    for (let i = 0; i < indexes.length; i++) {
      await fetch(`https://${subdomain}.putboot.dev/api/guests/${indexes[i]}`, {
        method: "DELETE",
      });
    }
  }

  return (
    <>
      <div className="flex justify-between items-center p-5 pb-0 w-full">
        <div className="w-1/2 sm:w-1/3 md:w-1/4">
          <input
            className="rounded-md px-3 py-2 w-full focus:ring-0 outline-none border-none bg-slate-100 focus:bg-slate-200 text-slate-500"
            type="text"
            placeholder="Search guest"
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex pr-5">
          {selectedRows.length === 0 && (
            <button
              onClick={() => setShowAddGuestModal(true)}
              className="btn h-10 flex items-center space-x-2"
            >
              <div className="w-6 h-6">
                <PlusCircleIcon />
              </div>
              <div>Add Guest</div>
            </button>
          )}
          {selectedRows.length > 0 && (
            <button
              onClick={() => deleteGuests(selectedRows)}
              className="btn h-10 flex items-center space-x-2 bg-red-600 text-gray-600 hover:bg-red-500"
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          )}
        </div>
        <AddGuestModal
          open={showAddGuestModal}
          setOpen={setShowAddGuestModal}
        />
      </div>
      <div className="w-full p-4 pr-10">
        <div className="overflow-x-auto w-full rounded-lg">
          <table className="w-full table-auto table ">
            <thead className="text-slate-700 font-normal">
              <tr
                className={`
              ${allSelected() && !noneSelected() && "bg-gray-100"}
                border-slate-300
            `}
              >
                <TableHeader>
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === displayedGuests?.length &&
                      !noneSelected()
                    }
                    onChange={handleSelectAllRows}
                    className="checkbox"
                  />
                </TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Address</TableHeader>
                <TableHeader>ID Number</TableHeader>
              </tr>
            </thead>
            <tbody>
              {displayedGuests?.map((guest) => (
                <tr
                  key={guest.id}
                  className={`
                ${selectedRows.includes(guest.id) && "bg-gray-100"}
                  border-dashed border-t border-slate-200
              `}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(guest.id)}
                      onChange={() => handleRowSelect(guest.id)}
                      className="checkbox"
                    />
                  </TableCell>
                  <TableCell>{guest.name}</TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>{guest.address}</TableCell>
                  <TableCell>{guest.id_number}</TableCell>
                </tr>
              ))}
              {displayedGuests?.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-sm">
                    No guests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
