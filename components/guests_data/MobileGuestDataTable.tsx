import { Guest } from "@/types/typings";
import TableRowMobile from "./TableRowMobile";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  guest: Guest;
  refreshData: () => void;
};

function MobileGuestDataTable({ guest, refreshData }: Props) {
  const router = useRouter();

  const confirmDeleteGuest = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this guest?"
    );
    if (!confirmDelete) return;
    deleteGuest();
  };

  const deleteGuest = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guests/${guest.id}`, {
        method: "DELETE",
      });
      router.refresh();
      refreshData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ul className="bg-gray-200 p-3 my-2 rounded-xl text-sm space-y-1">
        <TableRowMobile titleText="Name:" contentText={guest.name} />
        <TableRowMobile titleText="Email:" contentText={guest.email} />
        <TableRowMobile titleText="Address:" contentText={guest.address} />
        <TableRowMobile titleText="ID Number:" contentText={guest.id_number} />
        <Link href={`/user/guests_data/${guest.id}`}>
          <button className="btn rounded-md mt-2 w-full">Edit</button>
        </Link>
        <button
          className="btn rounded-md mt-2 w-full"
          onClick={confirmDeleteGuest}
        >
          Delete
        </button>
      </ul>
    </div>
  );
}

export default MobileGuestDataTable;
