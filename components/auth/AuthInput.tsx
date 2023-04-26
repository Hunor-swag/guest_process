"use client";

import { ChangeEvent } from "react";

type Props = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  errorMessage?: string;
  onBlur?: () => void;
};

export default function AuthInput({
  onChange,
  errorMessage,
  className,
  onBlur,
  type,
  placeholder,
  value,
}: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className="w-full rounded-md border-gray-300 focus:border-gray-400 focus:ring-0 p-2 h-[40px] text-sm font-semibold placeholder:text-gray-400"
        onChange={onChange}
        onBlur={onBlur}
      />
      <span className="text-red-500 mt-1 ml-1 text-sm">{errorMessage}</span>
    </div>
  );
}
