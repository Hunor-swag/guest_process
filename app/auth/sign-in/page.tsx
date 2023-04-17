"use client";

import AuthInput from "@/components/AuthInput";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="w-full h-full" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center pb-8">
        <h1 className="text-2xl mb-4 font-bold">Sign In</h1>
        <h1 className="text-sm text-gray-400 font-semibold">With email</h1>
      </div>
      <AuthInput
        className="mb-8"
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <AuthInput
        className="mb-5"
        type="text"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <div className="flex justify-end mb-5">
        <Link className="link" href="auth/reset-password">
          Forgot Password ?
        </Link>
      </div>
      <div className="mb-5">
        <button
          className="text-white bg-blue-500 rounded-lg text-center w-full py-2 font-semibold"
          type="submit"
        >
          Sign In
        </button>
      </div>
      <div className="text-center font-semibold text-sm">
        <span className="opacity-40">Not a member yet? </span>
        <Link className="text-blue-500" href="/auth/sign-up">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default SignIn;
