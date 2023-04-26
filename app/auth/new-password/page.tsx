"use client";

import Link from "next/link";
import AuthInput from "@/components/auth/AuthInput";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import PwdStrengthIndicator from "@/components/PwdStrengthIndicator";
import { checkPasswordStrength } from "@/functions/checkPasswordStrength";

export default function NewPassword() {
  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [pwdStrength, setPwdStrength] = useState<number>(0);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSecondPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    setPwdStrength(checkPasswordStrength(password));
  }, [password]);

  return (
    <form className="w-full h-full" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center pb-8">
        <h1 className="text-2xl mb-4 font-bold">Setup New Password</h1>
        <h1 className="text-sm text-gray-400 font-semibold">
          Have you already reset the password ?{" "}
          <Link className="link" href="/auth/sign-in">
            Sign in
          </Link>
        </h1>
      </div>
      <AuthInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <div className="px-1 flex justify-between">
        <PwdStrengthIndicator pwdStrength={pwdStrength} num={1} />
        <PwdStrengthIndicator pwdStrength={pwdStrength} num={2} />
        <PwdStrengthIndicator pwdStrength={pwdStrength} num={3} />
        <PwdStrengthIndicator pwdStrength={pwdStrength} num={4} />
      </div>
      <div className="px-1 text-gray-400 text-xs font-semibold mb-5 border-none">
        Use 8 or more characters with a mix of letters, numbers & symbols.
      </div>
      <AuthInput
        className="mb-8 border-none"
        type="password"
        placeholder="Repeat Password"
        value={secondPassword}
        onChange={handleSecondPasswordChange}
      />
      <div className="mb-5">
        <div className="flex items-center text-sm font-semibold text-gray-400">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="rounded-md w-5 h-5 mr-2 focus:ring-0 focus:border-transparent border-gray-300"
            />

            <span>
              I Accept the{" "}
              <Link href="/terms" className="link">
                Terms and Conditions
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
          Sign Up
        </button>
      </div>
    </form>
  );
}
