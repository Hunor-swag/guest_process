"use client";

import { Guest, HotelSystemObject } from "@/types/typings";
import { cache, createContext, useContext, useEffect, useState } from "react";
import { GlobalContext } from "./createContext";

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const hotelSubdomain =
    typeof window !== "undefined" ? window.location.host.split(".")[0] : "";

  const [hotelObject, setHotelObject] = useState<
    HotelSystemObject | undefined | null
  >(undefined);

  const [guests, setGuests] = useState<Guest[] | null>(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        // console.log(
        //   "API url: ",
        //   `https://${hotelSubdomain}.putboot.dev/api/systems`
        // );
        const response = await fetch(
          `https://${hotelSubdomain}.putboot.dev/api/systems`,
          { cache: "no-store" }
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
        // console.log("Data: ", data);
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

  useEffect(() => {
    if (!hotelObject || !hotelObject.subdomain) return;
    const fetchGuestsData = async () => {
      try {
        const response = await fetch(
          `https://${hotelObject.subdomain}.putboot.dev/api/guests`,
          {
            next: {
              tags: ["guests"],
              revalidate: 60,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Could not fetch guests data!");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("Error:", error);
        throw error;
      }
    };

    fetchGuestsData()
      .then((data) => {
        setGuests(() => data.data as Guest[]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [hotelObject]);

  return (
    <GlobalContext.Provider
      value={{
        hotel_name: hotelSubdomain,
        hotel_object: hotelObject,
        guests: guests,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export const useGlobalContext = () => useContext(GlobalContext);
