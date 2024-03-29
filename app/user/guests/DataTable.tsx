"use client";

import { Guest } from "@/types/typings";
import TableCell from "./TableCell";
import TableHeader from "./TableHeader";
import { useState, useEffect } from "react";
import AddGuestModal from "./AddGuestModal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useGuests, useHotelSystem } from "@/store/store";
import { Spinner } from "flowbite-react";
import { PlusIcon } from "@heroicons/react/24/solid";
import EditGuestModal from "./EditGuestModal";
import { parseAddress } from "@/functions/parseAddress";

export default function DataTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedGuestData, setSelectedGuestData] = useState<Guest>(
    {} as Guest
  );

  const [showAddGuestModal, setShowAddGuestModal] = useState(false);
  const [showEditGuestModal, setShowEditGuestModal] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const guests = useGuests((state) => state.guests);
  const setGuests = useGuests((state) => state.setGuests);

  const [filteredGuests, setFilteredGuests] = useState<Guest[] | null>(null);

  const refreshGuests = () => {
    setIsLoading(true);
    fetch(
      `https://${useHotelSystem.getState().subdomain}.putboot.dev/api/guests`,
      {
        cache: "no-store",
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setIsLoading(false);
        setGuests(json.data);
      })
      .catch((error) => {
        console.error("Error refreshing guests:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    refreshGuests();
  }, []);

  useEffect(() => {
    setFilteredGuests(guests);
    setIsLoading(false);
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
    setFilteredGuests(filteredGuests);
  };

  function noneSelected() {
    return selectedRows.length === 0;
  }

  function allSelected() {
    if (!guests) return false;
    return selectedRows.length === guests?.length;
  }

  // console.log("guests: ", guests);

  async function deleteGuests(indexes: number[]) {
    const subdomain = useHotelSystem.getState().subdomain;
    for (let i = 0; i < indexes.length; i++) {
      await fetch(`https://${subdomain}.putboot.dev/api/guests/${indexes[i]}`, {
        method: "DELETE",
      });
    }
    refreshGuests();
    setSelectedRows([]);
  }

  const handleEditGuest = () => {
    setSelectedGuestData(
      guests?.find((guest) => guest.id === selectedRows[0])!
    );
    setShowEditGuestModal(true);
  };

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
              className="bg-slate-100 p-2 rounded-xl hover:bg-slate-200 text-slate-500 transition-all duration-100 pr-4"
            >
              <div className="flex justify-center items-center space-x-2">
                <PlusIcon className="w-6 h-6" />
                <span>Add</span>
              </div>
            </button>
          )}
          {selectedRows.length === 1 && (
            <button
              onClick={handleEditGuest}
              className="bg-slate-200 p-2 rounded-xl hover:bg-slate-300 text-slate-600 transition-all duration-100 mr-2"
            >
              <PencilIcon className="w-6 h-6 bg-" />
            </button>
          )}
          {selectedRows.length > 0 && (
            <button
              onClick={() => deleteGuests(selectedRows)}
              className="p-2 rounded-xl bg-red-400 text-gray-600 hover:bg-red-500"
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          )}
        </div>
        <AddGuestModal
          open={showAddGuestModal}
          setOpen={setShowAddGuestModal}
          refreshData={refreshGuests}
        />
        <EditGuestModal
          open={showEditGuestModal}
          setOpen={setShowEditGuestModal}
          refreshData={refreshGuests}
          guestData={selectedGuestData}
        />
      </div>
      <div className="w-full p-4 pr-10">
        <div className="overflow-x-auto w-full rounded-lg overflow-y-hidden">
          <table className="w-full table-auto table">
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
                      selectedRows.length === guests?.length && !noneSelected()
                    }
                    onChange={handleSelectAllRows}
                    className="checkbox"
                  />
                </TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Address</TableHeader>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center text-sm">
                    <Spinner aria-label="Guests loading..." />
                  </td>
                </tr>
              ) : (
                filteredGuests?.map((guest) => (
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
                    <TableCell>{parseAddress(guest.address)}</TableCell>
                  </tr>
                ))
              )}
              {filteredGuests?.length === 0 && !isLoading && (
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
