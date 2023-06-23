"use client";

import AuthInput from "@/components/auth/AuthInput";
import Link from "next/link";
import {
  isPasswordEntered,
  isValidEmail,
  passwordEntered,
  validateEmail,
} from "@/functions/validations";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useDictionary from "@/hooks/useDictionary";
import { useRouter } from "next/navigation";
import { SignInResponse, signIn, useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "@/components/context/GlobalContextProvider";

export default function SignIn() {
  const dict = useDictionary().auth;
  const router = useRouter();
  const { data: session } = useSession();

  const subdomain = useGlobalContext();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: e.target.value }));
  };

  const validate = () => {
    if (!isValidEmail(values.email)) {
      toast("Invalid Email format!", {
        position: "top-right",
        autoClose: 3000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    if (!isPasswordEntered(values.password)) {
      toast("Please enter your password!", {
        position: "top-right",
        autoClose: 3000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    // return errorArray.every((error) => error === "");
    return true;
  };

  const authenticate = (user: SignInResponse | undefined) => {
    if (!user) {
      toast("No user data found.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        type: "error",
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (user?.error) {
      toast("Invalid Credentials!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        type: "error",
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    const user = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (!user) {
    }
    if (!authenticate(user)) {
      return;
    }

    router.push("/user");
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
      <ToastContainer className="text-red-700" />
    </form>
  );
}
