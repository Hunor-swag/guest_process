"use client";

import { FocusEvent, FormEvent, useState } from "react";
import Input from "../../components/add-system/Input";
import useDictionary from "@/hooks/useDictionary";
import Link from "next/link";
import {
  isValid,
  isValidEmail,
  isValidPassword,
  passwordsMatch,
  validateEmail,
  validatePassword,
  validateRequiredField,
  validateSecondPassword,
} from "@/functions/validations";

export default function RegisterSystemPage() {
  const defaultObject = { value: "", error: "" };
  const [values, setValues] = useState({
    restaurant_name: defaultObject,
    person_name: defaultObject,
    email: defaultObject,
    phone: defaultObject,
    password: defaultObject,
    password_confirmation: defaultObject,
    terms: { value: false, error: "" },
    privacy_policies: { value: false, error: "" },
  });

  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: { ...[name], value: e.target.value },
    }));
  };

  const dict = useDictionary();

  const validate = () => {
    return (
      isValidEmail(values.email.value) &&
      isValid(values.restaurant_name.value) &&
      isValid(values.phone.value) &&
      isValid(values.person_name.value) &&
      isValidPassword(values.password.value) &&
      passwordsMatch(
        values.password.value,
        values.password_confirmation.value
      ) &&
      values.terms.value &&
      values.privacy_policies.value
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // if (!validate()) {
    //   setShowErrorDialog(true);
    //   return;
    // }
    // resetForm();
    setShowSuccessDialog(true);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/systems`, {
        method: "POST",
        body: JSON.stringify({
          name: values.restaurant_name.value.toLowerCase(),
          contact_email: values.email.value,
          contact_phone: values.phone.value,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const resetForm = () => {
    setValues({
      restaurant_name: defaultObject,
      person_name: defaultObject,
      email: defaultObject,
      phone: defaultObject,
      password: defaultObject,
      password_confirmation: defaultObject,
      terms: { value: false, error: "" },
      privacy_policies: { value: false, error: "" },
    });
  };

  const setErrorMessage = (
    e: FocusEvent<HTMLInputElement>,
    name: string,
    error: string
  ) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: {
        value: e.target.value,
        error: error,
      },
    }));
  };

  return (
    <>
      <div>
        <h1 className="text-5xl text-center">LOGO</h1>
        <h1 className="text-center text-2xl my-3 font-bold">
          {dict.registerSystem.title1}
        </h1>
        <h2 className="text-center text-lg font-semibold">
          {dict.registerSystem.title2}
        </h2>
      </div>
      <form className="p-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          label={dict.registerSystem.restaurantName}
          errorMessage={values.restaurant_name.error}
          subLabel={dict.registerSystem.restaurantNameSubLabel}
          value={values.restaurant_name.value}
          onChange={(e) => handleInputChange(e, "restaurant_name")}
          onBlur={(e) =>
            setErrorMessage(
              e,
              "restaurant_name",
              validateRequiredField(e.target.value, dict.auth.validationTexts)
            )
          }
        />
        <Input
          type="text"
          label={dict.registerSystem.personName}
          errorMessage={values.person_name.error}
          value={values.person_name.value}
          onChange={(e) => handleInputChange(e, "person_name")}
          onBlur={(e) =>
            setErrorMessage(
              e,
              "person_name",
              validateRequiredField(e.target.value, dict.auth.validationTexts)
            )
          }
        />
        <div className="lg:flex lg:space-x-10">
          <Input
            type="email"
            label={dict.registerSystem.email}
            errorMessage={values.email.error}
            value={values.email.value}
            onChange={(e) => handleInputChange(e, "email")}
            onBlur={(e) =>
              setErrorMessage(
                e,
                "email",
                validateEmail(e.target.value, dict.auth.validationTexts)
              )
            }
          />
          <Input
            type="text"
            label={dict.registerSystem.phoneNumber}
            errorMessage={values.phone.error}
            value={values.phone.value}
            onChange={(e) => handleInputChange(e, "phone")}
            onBlur={(e) =>
              setErrorMessage(
                e,
                "phone",
                validateRequiredField(e.target.value, dict.auth.validationTexts)
              )
            }
          />
        </div>
        <div className="lg:flex lg:space-x-10">
          <Input
            type="password"
            label={dict.registerSystem.password}
            errorMessage={values.password.error}
            value={values.password.value}
            onChange={(e) => handleInputChange(e, "password")}
            onBlur={(e) =>
              setErrorMessage(
                e,
                "password",
                validatePassword(e.target.value, dict.auth.validationTexts)
              )
            }
          />
          <Input
            type="password"
            label={dict.registerSystem.passwordConfirmation}
            errorMessage={values.password_confirmation.error}
            value={values.password_confirmation.value}
            onChange={(e) => handleInputChange(e, "password_confirmation")}
            onBlur={(e) =>
              setErrorMessage(
                e,
                "password_confirmation",
                validateSecondPassword(
                  e.target.value,
                  values.password.value,
                  dict.auth.validationTexts
                )
              )
            }
          />
        </div>
        <div className="text-sm flex flex-col justify-center text-[#0099ff] font-semibold">
          <div className="">
            <input
              type="checkbox"
              className="m-5 focus:ring-0 focus:ring-offset-0 rounded-md"
              checked={values.terms.value}
              onChange={() =>
                setValues((prevValues) => ({
                  ...prevValues,
                  terms: {
                    ...prevValues.terms,
                    value: !prevValues.terms.value,
                  },
                }))
              }
            />
            <span>
              {dict.registerSystem.termsAndConditions1}
              <Link href="#" className="underline font-bold">
                {dict.registerSystem.termsAndConditionsLink}
              </Link>
              {dict.registerSystem.termsAndConditions2}
            </span>
            <div className="flex">
              <input
                type="checkbox"
                className="m-5 focus:ring-0 focus:ring-offset-0 rounded-md"
                checked={values.privacy_policies.value}
                onChange={() =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    privacy_policies: {
                      ...prevValues.privacy_policies,
                      value: !prevValues.privacy_policies.value,
                    },
                  }))
                }
              />
              <div>
                <p>
                  {dict.registerSystem.privacyPolicies1}
                  <Link href="#" className="underline font-bold">
                    {dict.registerSystem.privacyPoliciesLink}
                  </Link>
                  {dict.registerSystem.privacyPolicies2}
                </p>
                <p className="text-black">
                  {dict.registerSystem.privacyPolicies3}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="text-white h-10 w-40 bg-[#0099ff] mt-4 rounded-md">
            {dict.registerSystem.submitButtonText}
          </button>
        </div>
      </form>
    </>
  );
}
