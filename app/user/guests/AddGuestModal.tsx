"use client";

import InputWithLabel from "@/components/InputWithLabel";
import PanelForm from "@/components/PanelForm";
import { useGuests, useHotelSystem } from "@/store/store";
import { Guest } from "@/types/typings";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState, useContext } from "react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshData: () => void;
};

export default function AddGuestModal({ open, setOpen, refreshData }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const subdomain = useHotelSystem.getState().subdomain;

  const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    email: "",
    country: "",
    postal_code: "",
    city: "",
    street: "",
    number: "",
  });

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

  // const refreshData = () => {
  //   fetch(`https://${subdomain}.putboot.dev/api/guests`).then(() => {
  //     revalidateTag("guests");
  //   });
  // };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!subdomain) {
        console.error("Cannot get subdomain");
        return;
      }
      await fetch(`https://${subdomain}.putboot.dev/api/guests`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // useGuests.getState().addGuest({
      //   name: values.name,
      //   email: values.email,
      //   address: values.address,
      //   id_number: values.id_number,
      // } as Guest);
      refreshData();
      resetForm();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const resetForm = () => {
    setValues({
      name: "",
      email: "",
      country: "",
      postal_code: "",
      city: "",
      street: "",
      number: "",
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
          submitButtonText="Add"
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
          title="Add Guest"
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
            onChange={(e) => handleInputChange(e, "country")}
            value={values.country}
          />
          <InputWithLabel
            name="Postal Code"
            onChange={(e) => handleInputChange(e, "postal_code")}
            value={values.postal_code}
          />
          <InputWithLabel
            name="City"
            onChange={(e) => handleInputChange(e, "city")}
            value={values.city}
          />
          <InputWithLabel
            name="Street"
            onChange={(e) => handleInputChange(e, "street")}
            value={values.street}
          />
          <InputWithLabel
            name="Number"
            onChange={(e) => handleInputChange(e, "number")}
            value={values.number}
          />
        </PanelForm>
      </dialog>
    </>
  );
}
