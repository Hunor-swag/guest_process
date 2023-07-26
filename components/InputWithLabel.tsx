"use client";

type Props = {
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
};

export default function InputWithLabel({
  name,
  value = "",
  onChange,
  autoFocus = false,
  placeholder,
}: Props) {
  return (
    <div className="w-full flex my-2 text-sm items-center font-semibold">
      <div className="w-1/3 text-gray-600">{name}</div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-3/4 text-sm rounded-md bg-gray-200 border-none text-gray-700 font-semibold"
        autoFocus={autoFocus}
        placeholder={placeholder}
      />
    </div>
  );
}
