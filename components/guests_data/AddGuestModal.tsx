"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import PanelForm from "../PanelForm";
import InputWithLabel from "../InputWithLabel";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddGuestModal({ open, setOpen }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    email: "",
    address: "",
    id_number: "",
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guests`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      resetForm();
      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const resetForm = () => {
    setValues({
      name: "",
      email: "",
      address: "",
      id_number: "",
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
          height="full"
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
            name="Address"
            onChange={(e) => handleInputChange(e, "address")}
            value={values.address}
          />
          <InputWithLabel
            name="ID Number"
            onChange={(e) => handleInputChange(e, "id_number")}
            value={values.id_number}
          />
        </PanelForm>
      </dialog>
    </>
  );
}

export default AddGuestModal;
