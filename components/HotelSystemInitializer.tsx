"use client";

import { useRef } from "react";
import { useHotelSystem } from "@/store/store";

export default function HotelSystemInitializer({
  subdomain,
  domain,
}: {
  subdomain: string;
  domain: string;
}) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useHotelSystem.setState({
      subdomain,
    });
    initialized.current = true;
  }
  return null;
}
