// "use client";

// import { useEffect, useState } from "react";
// import Panel from "../Panel";
// import { Guest } from "@/types/typings";
// import AddGuestModal from "./AddGuestModal";
// import DataTable from "./DataTable";

// export default function GuestsData({ guests }: { guests: Guest[] }) {
//   const [showAddGuestModal, setShowAddGuestModal] = useState(false);

//   return (
//     <Panel
//       bgcolor="white"
//       height="full"
//       title="Guests"
//       width="full"
//       buttonText="Add Guest"
//       buttonClickHandler={() => setShowAddGuestModal(true)}
//     >
//       <DataTable data={guests} />
//       <AddGuestModal open={showAddGuestModal} setOpen={setShowAddGuestModal} />
//     </Panel>
//   );
// }
