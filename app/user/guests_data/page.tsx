import GuestsData from "@/components/guests_data/GuestsData";
import { Guest } from "@/types/typings";

async function getData() {
  // const res = await fetch("http://localhost:3000/api/guests");
  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  // return res.json();
  return new Array() as Guest[];
}

export default async function GuestsPage() {
  const guests = await getData();

  return <GuestsData guests={guests} />;
}
