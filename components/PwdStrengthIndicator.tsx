type Props = {
  pwdStrength: number;
  num: number;
};

export default function PwdStrengthIndicator({ pwdStrength, num }: Props) {
  return (
    <div
      className={`bg-gray-200 rounded-full w-[24%] h-[5px] my-2 ${
        pwdStrength >= num && "bg-green-500"
      }`}
    />
  );
}
