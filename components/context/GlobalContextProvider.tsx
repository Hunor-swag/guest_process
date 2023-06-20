"use client";

import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const hotelName =
    typeof window !== "undefined" ? window.location.host.split(".")[0] : "";

  return (
    <GlobalContext.Provider value={{ hotel_name: hotelName }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);