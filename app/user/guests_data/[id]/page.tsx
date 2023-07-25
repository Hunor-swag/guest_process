"use client";

import InputWithLabel from "@/components/InputWithLabel";
import PanelForm from "@/components/PanelForm";
import { useGlobalContext } from "@/components/context/GlobalContextExports";
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

  const router = useRouter();

  const context = useGlobalContext();

  useEffect(() => {
    if (!context || !context.hotel_object || !context.hotel_object.subdomain) {
      console.error("No context or hotel object found");
      return;
    }
    fetch(
      `https://${context.hotel_object.subdomain}.putboot.dev/api/guests/${params.id}`
    )
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
      if (
        !context ||
        !context.hotel_object ||
        !context.hotel_object.subdomain
      ) {
        console.error("No context or hotel object found");
        return;
      }
      const response = await fetch(
        `https://${context.hotel_object.subdomain}.putboot.dev/api/guests/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(guest),
        }
      );

      if (response.ok) {
        router.push("/user/guests_data");
        router.refresh();
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
          onClick={() => router.push("/user/guests_data")}
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
