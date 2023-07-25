"use client";

import { Guest, HotelSystemObject } from "@/types/typings";
import { createContext } from "react";

interface GlobalContextType {
  hotel_name: string;
  hotel_object: HotelSystemObject | null | undefined;
  guests?: Guest[] | null;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);
