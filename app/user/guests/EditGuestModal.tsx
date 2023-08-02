"use client";

import InputWithLabel from "@/components/InputWithLabel";
import PanelForm from "@/components/PanelForm";
import { useHotelSystem, useGuests } from "@/store/store";
import { Address, Guest } from "@/types/typings";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  guestData: Guest; // Pass the guest data that needs to be edited
  refreshData: () => void;
};

export default function EditGuestModal({
  open,
  setOpen,
  guestData,
  refreshData,
}: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const subdomain = useHotelSystem.getState().subdomain;
  const router = useRouter();

  const [values, setValues] = useState({
    id: guestData ? guestData.id : 0,
    name: guestData ? guestData.name : "",
    email: guestData ? guestData.email : "",
    address: guestData
      ? guestData.address
      : {
          country: "",
          postal_code: "",
          city: "",
          street: "",
          number: "",
        },
    // country: guestData ? guestData.address.country : "",
    // postal_code: guestData ? guestData.address.postal_code : "",
    // city: guestData ? guestData.address.city : "",
    // street: guestData ? guestData.address.street : "",
    // number: guestData ? guestData.address.number : "",
  });

  useEffect(() => {
    if (guestData) setValues(guestData);
  }, [guestData]);

  useEffect(() => {
    if (open && modalRef.current && !modalRef.current.open)
      modalRef.current?.showModal();
    else if (!open && modalRef.current && modalRef.current.open)
      modalRef.current?.close();
  }, [open]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!subdomain) {
        console.error("Cannot get subdomain");
        return;
      }
      await fetch(
        `https://${subdomain}.putboot.dev/api/guests/${guestData?.id}`,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update the guest data in the store
      useGuests.getState().updateGuest(guestData?.id, {
        ...values,
      });

      refreshData();
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const resetForm = () => {
    setValues({
      id: 0,
      name: "",
      email: "",
      address: {
        country: "",
        postal_code: "",
        city: "",
        street: "",
        number: "",
      },
    });
  };

  return (
    <>
      <dialog
        ref={modalRef}
        className="rounded-xl w-[90%] max-w-4xl backdrop:bg-gray-500 backdrop:bg-opacity-50"
      >
        <PanelForm
          bgcolor="white"
          height="fit"
          onSubmit={handleSubmit}
          submitButtonText="Save"
          submitButtonClickHandler={() => setOpen(false)}
          otherButtons={
            <button
              type="button"
              className="btn"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          }
          title="Edit Guest"
          width="full"
        >
          <InputWithLabel
            name="Name"
            autoFocus={true}
            onChange={(e) => handleInputChange(e, "name")}
            value={values.name}
          />
          <InputWithLabel
            name="Email"
            onChange={(e) => handleInputChange(e, "email")}
            value={values.email}
          />
          <InputWithLabel
            name="Country"
            onChange={(e) => handleInputChange(e, "address.country")}
            value={values.address.country}
          />
          <InputWithLabel
            name="Postal Code"
            onChange={(e) => handleInputChange(e, "address.postal_code")}
            value={values.address.postal_code}
          />

          <InputWithLabel
            name="City"
            onChange={(e) => handleInputChange(e, "address.city")}
            value={values.address.city}
          />

          <InputWithLabel
            name="Street"
            onChange={(e) => handleInputChange(e, "address.street")}
            value={values.address.street}
          />

          <InputWithLabel
            name="Number"
            onChange={(e) => handleInputChange(e, "address.number")}
            value={values.address.number}
          />
        </PanelForm>
      </dialog>
    </>
  );
}
