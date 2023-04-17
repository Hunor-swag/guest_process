import { ChangeEvent, useState } from "react";

type Props = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const AuthInput = ({
  type,
  value,
  onChange,
  placeholder,
  className,
}: Props) => {
  return (
    <div className={className}>
      <input
        className="w-full rounded-md border-gray-300 focus:border-gray-400 focus:ring-0 p-2 h-[40px] text-sm font-semibold placeholder:text-gray-400"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default AuthInput;
