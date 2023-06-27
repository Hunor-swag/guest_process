"use client";

import { HotelSystemObject } from "@/types/typings";
import { TrophyIcon } from "@heroicons/react/24/outline";
import { createContext, useContext, useEffect, useState } from "react";

interface GlobalContextType {
  hotel_name: string;
  hotel_object: HotelSystemObject | null | undefined;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const hotelSubdomain =
    typeof window !== "undefined" ? window.location.host.split(".")[0] : "";

  const [hotelObject, setHotelObject] = useState<
    HotelSystemObject | undefined | null
  >(undefined);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/systems`
        );

        if (!response.ok) {
          throw new Error("Could not fetch hotel system data!");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("Error:", error);
        throw error;
      }
    };

    fetchHotelData()
      .then((data) => {
        const foundHotelObject = data.find(
          (hotel: HotelSystemObject) => hotel.subdomain === hotelSubdomain
        );
        if (!foundHotelObject) {
          throw new Error("Hotel system doesn't exist!");
        }
        setHotelObject(foundHotelObject);
      })
      .catch((error) => {
        setHotelObject(null);
        console.log(error);
      });
  }, [hotelSubdomain]);

  return (
    <GlobalContext.Provider
      value={{ hotel_name: hotelSubdomain, hotel_object: hotelObject }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
