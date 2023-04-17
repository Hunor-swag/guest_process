"use client";

import AuthInput from "@/components/AuthInput";
import { ChangeEvent, FormEvent, useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="w-full h-full" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center pb-8">
        <h1 className="text-2xl mb-4 font-bold">Forgot Password?</h1>
        <h1 className="text-sm text-gray-400 font-semibold">
          Enter your email to reset your password .
        </h1>
      </div>
      <AuthInput
        className="mb-8"
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />

      <div className="mb-5 mt-5 flex justify-center space-x-10">
        <button
          className="text-white bg-blue-500 rounded-lg text-center w-1/4 py-2 font-semibold"
          type="submit"
        >
          Submit
        </button>
        <button
          className="text-gray-500 bg-gray-100 rounded-lg text-center w-1/4 py-2 font-semibold"
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;
