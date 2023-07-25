"use client";

import { useRef } from "react";
import { useGuests, useHotelSystem } from "@/store/store";
import { Guest } from "@/types/typings";

export default function GuestsInitializer({ guests }: { guests: Guest[] }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useGuests.setState({ guests: guests });
    initialized.current = true;
  }
  return null;
}
