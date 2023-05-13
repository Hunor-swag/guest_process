"use client";

import { FormEvent, useState } from "react";
import Input from "./system-user-auth/Input";
import { validateEmail, validatePassword } from "@/functions/validations";
import { useDictionary } from "@/hooks/useDictionary";
import { signIn } from "next-auth/react";

function Login() {
  const dict = useDictionary();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setValues((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex justify-center md:items-center h-screen">
      <div className="w-full md:w-3/4 lg:w-1/2 mx-4 my-10 p-6 border border-black">
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            onChange={(e) => handleChange(e, "email")}
            value={values.email}
            errorMessage={errors.email}
            type="email"
            onBlur={(e) => {
              setErrors((prev) => ({
                ...prev,
                email: validateEmail(e.target.value, dict.auth.validationTexts),
              }));
            }}
          />
          <Input
            label="Password"
            onChange={(e) => handleChange(e, "password")}
            value={values.password}
            errorMessage={errors.password}
            type="password"
            onBlur={(e) => {
              setErrors((prev) => ({
                ...prev,
                password: validatePassword(
                  e.target.value,
                  dict.auth.validationTexts
                ),
              }));
            }}
          />
          <button
            className="w-full bg-gray-200 rounded-lg py-2 hover:bg-gray-300"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
