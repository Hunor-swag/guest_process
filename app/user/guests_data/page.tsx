import GuestsData from "@/components/guests_data/GuestsData";
import { Guest } from "@/types/typings";

async function getData() {
  // const res = await fetch("http://localhost:3000/api/guests");
  // const json = await res.json();
  // if (json.errors) {
  //   throw new Error("Failed to fetch API");
  // }

  // return json.data;
  return new Array<Guest>();
}

export default async function GuestsPage() {
  const guests = await getData();

  return <GuestsData guests={guests} />;
}
