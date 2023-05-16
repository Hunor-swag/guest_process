"use client";

import PanelForm from "@/components/PanelForm";
import InputWithLabel from "@/components/InputWithLabel";
import { useDictionary } from "@/hooks/useDictionary";
import React, { ChangeEvent, useState } from "react";

export default function ProfilePage() {
  const dict = useDictionary();
  const [values, setValues] = useState({
    full_name: "",
    phone_number: "",
    address: "",
    birth_date: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: e.target.value,
    }));
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Name</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-8">Email</h2>
      <PanelForm
        bgcolor="white"
        width="full"
        height="full"
        submitButtonText="Submit"
        title={dict.userProfile.profileDetails}
        onSubmit={() => {}}
      >
        <InputWithLabel
          name={dict.userProfile.fullName}
          value={values.full_name}
          onChange={(e) => handleInputChange(e, "full_name")}
          autoFocus
        />
        <InputWithLabel
          name={dict.userProfile.phoneNumber}
          value={values.phone_number}
          onChange={(e) => handleInputChange(e, "phone_number")}
        />
        <InputWithLabel
          name={dict.userProfile.address}
          value={values.address}
          onChange={(e) => handleInputChange(e, "address")}
        />
      </PanelForm>
    </div>
  );
}
