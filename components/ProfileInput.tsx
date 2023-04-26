"use client";

type Props = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ProfileInput({ name, value, onChange }: Props) {
  return (
    <div className="w-full flex my-2 text-sm items-center font-semibold">
      <div className="w-1/3 text-gray-600">{name}</div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-1/2 text-sm focus:ring-0 rounded-md bg-gray-200 border-none text-gray-700 font-semibold"
      />
    </div>
  );
}

export default ProfileInput;
