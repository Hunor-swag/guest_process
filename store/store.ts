import { Guest } from "@/types/typings";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type HotelSystemState = {
  subdomain: string;
  domain: string;
};

export type GuestState = {
  guests: Guest[];
  addGuest: (newGuest: Guest) => void;
  setGuests: (guests: Guest[]) => void;
  updateGuest: (guestId: number, updatedGuest: Guest) => void;
};

export const useHotelSystem = create<HotelSystemState>()(
  persist(
    (set) => ({
      subdomain: "",
      domain: "",
    }),
    {
      name: "hotelSystem",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useGuests = create<GuestState>()(
  persist(
    (set) => ({
      guests: [],
      addGuest: (newGuest: Guest) =>
        set((state) => ({ guests: [...state.guests, newGuest] })),
      setGuests: (guests: Guest[]) => set(() => ({ guests })),
      updateGuest: (guestId: number, updatedGuest: Guest) =>
        set((state) => ({
          guests: state.guests.map((guest) =>
            guest.id === guestId ? updatedGuest : guest
          ),
        })),
    }),
    {
      name: "hotelSystem",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
