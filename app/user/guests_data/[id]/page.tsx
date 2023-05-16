"use client";

import InputWithLabel from "@/components/InputWithLabel";
import PanelForm from "@/components/PanelForm";
import { Guest } from "@/types/typings";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

function IdPage({ params }: { params: { id: string } }) {
  const [guest, setGuest] = useState({
    name: "",
    email: "",
    address: "",
    id_number: "",
  } as Guest);

  const { push } = useRouter();

  useEffect(() => {
    const result = fetch(`http://localhost:3000/api/guests/${params.id}`)
      .then((res) => res.json())
      .then((data) => setGuest(data[0]));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setGuest({ ...guest, [name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/guests/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(guest),
        }
      );

      if (response.ok) {
        push("/user/guests_data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <PanelForm
      bgcolor="white"
      height="600"
      submitButtonText="Submit"
      otherButtons={
        <button
          type="button"
          className="btn"
          onClick={() => push("/user/guests_data")}
        >
          Back
        </button>
      }
      title="Edit Guest Data"
      width="full"
      onSubmit={handleSubmit}
    >
      <InputWithLabel
        name="Name"
        autoFocus={true}
        onChange={(e) => {
          handleChange(e, "name");
        }}
        value={guest.name}
      />
      <InputWithLabel
        name="Email"
        onChange={(e) => {
          handleChange(e, "email");
        }}
        value={guest.email}
      />
      <InputWithLabel
        name="Address"
        onChange={(e) => {
          handleChange(e, "address");
        }}
        value={guest.address}
      />
      <InputWithLabel
        name="ID Number"
        onChange={(e) => {
          handleChange(e, "id_number");
        }}
        value={guest.id_number}
      />
    </PanelForm>
  );
}

export default IdPage;
