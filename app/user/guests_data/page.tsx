import GuestsData from "@/components/guests_data/GuestsData";

async function getData() {
  const res = await fetch("http://localhost:3000/api/guests", {
    next: {
      tags: ["guests"],
      revalidate: 60,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function GuestsPage() {
  const guests = await getData();

  return <GuestsData guests={guests.data} />;
}
