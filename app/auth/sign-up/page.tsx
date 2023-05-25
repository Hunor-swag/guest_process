"use client";

import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import PwdStrengthIndicator from "@/components/PwdStrengthIndicator";
import AuthInput from "@/components/auth/AuthInput";
import {
  validateEmail,
  validatePassword,
  validateSecondPassword,
} from "@/functions/validations";
import Link from "next/link";
import { checkPasswordStrength } from "@/functions/checkPasswordStrength";
import useDictionary from "@/hooks/useDictionary";

export default function SignUp() {
  const dict = useDictionary().auth;

  const [values, setValues] = useState({
    email: "",
    password: "",
    secondPassword: "",
    terms: false,
  });

  const [pwdStrength, setPwdStrength] = useState<number>(0);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    secondPassword: "",
    terms: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: e.target.value }));
  };

  useEffect(() => {
    setPwdStrength(checkPasswordStrength(values.password));
  }, [values.password]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const setValidationError = (name: string, message: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [name]: message }));
  };

  const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      terms: e.target.checked,
    }));
  };

  return (
    <form className="w-full h-full" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center pb-8">
        <h1 className="text-2xl mb-4 font-bold">{dict.signUp.signUp}</h1>
        <h1 className="text-sm text-gray-400 font-semibold">
          {dict.signUp.withEmail}
        </h1>
      </div>
      <div className="mb-8">
        <AuthInput
          className="mb-8"
          type="email"
          errorMessage={errors.email}
          placeholder={dict.signUp.email}
          value={values.email}
          onChange={(e) => handleChange(e, "email")}
          onBlur={() =>
            setValidationError(
              "email",
              validateEmail(values.email, dict.validationTexts)
            )
          }
        />
      </div>
      <div>
        <AuthInput
          type="password"
          placeholder={dict.signUp.password}
          errorMessage={errors.password}
          value={values.password}
          onChange={(e) => handleChange(e, "password")}
          onBlur={() =>
            setValidationError(
              "password",
              validatePassword(values.password, dict.validationTexts)
            )
          }
        />
      </div>

      <div className="px-1 flex justify-between">
        <PwdStrengthIndicator pwdStrength={pwdStrength} num={1} />
        <PwdStrengthIndicator pwdStrength={pwdStrength} num={2} />
        <PwdStrengthIndicator pwdStrength={pwdStrength} num={3} />
        <PwdStrengthIndicator pwdStrength={pwdStrength} num={4} />
      </div>
      <div className="px-1 text-gray-400 text-xs font-semibold mb-5">
        {dict.signUp.passwordText}
      </div>
      <AuthInput
        className="mb-8"
        type="password"
        errorMessage={errors.secondPassword}
        placeholder={dict.signUp.repeatPassword}
        value={values.secondPassword}
        onChange={(e) => handleChange(e, "secondPassword")}
        onBlur={() =>
          setValidationError(
            "secondPassword",
            validateSecondPassword(
              values.secondPassword,
              values.password,
              dict.validationTexts
            )
          )
        }
      />
      <div className="mb-5">
        <div className="flex items-center text-sm font-semibold text-gray-400">
          <label className="flex items-center flex-wrap">
            <input
              type="checkbox"
              className="rounded-md focus:ring-offset-0 w-5 h-5 mr-2 focus:ring-0 border-gray-300"
              onChange={handleCheckChange}
            />
            <span>
              {dict.signUp.terms}
              <Link href="/terms" className="link">
                {dict.signUp.termsLink}
              </Link>
            </span>
          </label>
        </div>
      </div>
      <div className="mb-5 mt-5">
        <button
          className="text-white bg-blue-500 rounded-lg text-center w-full py-2 font-semibold"
          type="submit"
        >
          {dict.signUp.signUp}
        </button>
      </div>
      <div className="text-center font-semibold text-sm">
        <span className="text-gray-400">{dict.signUp.alreadyAMember} </span>
        <Link className="text-blue-500" href="/auth/sign-in">
          {dict.signUp.signIn}
        </Link>
      </div>
    </form>
  );
}
