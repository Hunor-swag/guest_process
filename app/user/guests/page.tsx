import DataTable from "./DataTable";
import { useGuests, useHotelSystem } from "@/store/store";
import GuestsInitializer from "@/components/GuestsInitializer";

export default async function GuestsPage() {
  return (
    <div className="bg-white rounded-xl w-full ">
      <DataTable />
    </div>
  );
}
