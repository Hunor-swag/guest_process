"use client";

type Props = {
  width: string;
  height: string;
  title: string;
  bgcolor: string;
  submitButtonText: string;
  submitButtonClickHandler?: () => void;
  otherButtons?: React.ReactNode;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function PanelForm({
  width,
  height,
  bgcolor,
  title,
  submitButtonText,
  submitButtonClickHandler,
  otherButtons,
  children,
  onSubmit,
}: Props) {
  return (
    <form
      className={`w-${width} h-${height} bg-${bgcolor} py-4 md:px-8 px-2 rounded-xl`}
      onSubmit={onSubmit}
    >
      <div className="flex justify-between items-center pb-4 border-b border-b-gray-400 mb-8 p-2">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="flex space-x-2">
          {otherButtons}
          <button
            type="submit"
            onClick={submitButtonClickHandler}
            className="btn"
          >
            {submitButtonText}
          </button>
        </div>
      </div>
      <div>{children}</div>
    </form>
  );
}
