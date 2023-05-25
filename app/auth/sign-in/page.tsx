"use client";

// egybol fokuszt kapjon az email mezo
// ahol rosszul van kitoltve, fokuszt kap az a mezo piros kerettel

import AuthInput from "@/components/auth/AuthInput";
import Link from "next/link";
import ErrorDialog from "@/components/auth/ErrorDialog";
import { passwordEntered, validateEmail } from "@/functions/validations";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import en from "@/dictionaries/en.json";
import hu from "@/dictionaries/hu.json";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useDictionary from "@/hooks/useDictionary";

export default function SignIn() {
  const dict = useDictionary().auth;

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: e.target.value }));
  };

  const validate = () => {
    const errorArray = [
      validateEmail(values.email, dict.validationTexts),
      passwordEntered(values.password, dict.validationTexts),
    ];
    return errorArray.every((error) => error === "");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      setErrorDialogOpen(true);
      return;
    }
  };

  const setValidationError = (name: string, message: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [name]: message }));
  };

  return (
    <form className="w-full h-full" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center pb-8">
        <h1 className="text-2xl mb-4 font-bold">{dict.signIn.signInTitle}</h1>
        <h1 className="text-sm text-gray-400 font-semibold">
          {dict.signIn.withEmail}
        </h1>
      </div>
      <AuthInput
        type="email"
        placeholder={dict.signIn.email}
        value={values.email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(e, "email")
        }
        className="mb-8"
        onBlur={() =>
          setValidationError(
            "email",
            validateEmail(values.email, dict.validationTexts)
          )
        }
        errorMessage={errors.email}
      />
      <AuthInput
        type="password"
        placeholder={dict.signIn.password}
        value={values.password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(e, "password")
        }
        className="mb-8"
        onBlur={() =>
          setValidationError(
            "password",
            passwordEntered(values.password, dict.validationTexts)
          )
        }
        errorMessage={errors.password}
      />

      <div className="flex justify-end mb-5">
        <Link className="link" href="auth/reset-password">
          {dict.signIn.forgotPassword}
        </Link>
      </div>
      <div className="mb-5">
        <button
          className="text-white bg-blue-500 rounded-lg text-center w-full py-2 font-semibold"
          type="submit"
        >
          {dict.signIn.signIn}
        </button>
      </div>
      <div className="text-center font-semibold text-sm">
        <span className="opacity-40">{dict.signIn.notAMemberYet} </span>
        <Link className="text-blue-500" href="/auth/sign-up">
          {dict.signIn.signUp}
        </Link>
      </div>
      <ErrorDialog
        onButtonClick={() => setErrorDialogOpen(false)}
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
      />
    </form>
  );
}
