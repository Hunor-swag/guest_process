import DataTable from "./DataTable";
import { useGuests, useHotelSystem } from "@/store/store";
import GuestsInitializer from "@/components/GuestsInitializer";

// async function getGuests() {
//   if (!useHotelSystem.getState().subdomain) {
//     return [];
//   }
//   const res = await fetch(
//     `https://${useHotelSystem.getState().subdomain}.putboot.dev/api/guests`,
//     {
//       cache: "no-store",
//     }
//   );

//   // console.log("subdomain: ", useHotelSystem.getState().subdomain);

//   return res.json();
// }

export default async function GuestsPage() {
  // const guests = (await getGuests()).data;
  // useGuests.setState({ guests: guests });
  // console.log(useHotelSystem.getState().guests);
  console.log("guests in server component: ", useGuests.getState().guests);

  return (
    <div className="bg-white rounded-xl w-full ">
      {/* <GuestsInitializer guests={guests} /> */}
      <DataTable />
    </div>
  );
}
