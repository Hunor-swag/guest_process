import React from "react";

type Props = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

function Input({ label, errorMessage, ...props }: Props) {
  return (
    <div className="w-full my-2">
      <span className="text-sm">{label}</span>
      <input className="w-full rounded-md px-3 py-2 bg-slate-200" {...props} />
      <p className="text-red-600">{errorMessage}</p>
    </div>
  );
}

export default Input;
