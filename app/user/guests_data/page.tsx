import GuestsData from "@/components/guests_data/GuestsData";
import { Guest } from "@/types/typings";
import next from "next/types";

async function getData() {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guests`, {
    cache: "no-store",
  });

  const json = await res.json();

  return json;
}

export default async function GuestsPage() {
  const guests = await getData();

  return <GuestsData guests={guests.data} />;
}
