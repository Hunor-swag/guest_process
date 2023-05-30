import GuestsData from "@/components/guests_data/GuestsData";
import { Guest } from "@/types/typings";
import getApiUrl from "@/functions/getApiUrl";

async function getData() {
  const res = await fetch(`${getApiUrl()}/api/guests`, {
    next: {
      tags: ["guests"],
    },
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error("Failed to fetch API");
  }

  return json.data;
  // return new Array<Guest>();
}

export default async function GuestsPage() {
  const guests = await getData();

  return <GuestsData guests={guests} />;
}
