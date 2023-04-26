"use client";

type Props = {
  width: string;
  height: string;
  title: string;
  bgcolor: string;
  submitButtonText: string;
  children: React.ReactNode;
};

function PanelForm({
  width,
  height,
  bgcolor,
  title,
  submitButtonText,
  children,
}: Props) {
  return (
    <form
      className={`w-${width} h-${height} bg-${bgcolor} py-4 px-8 rounded-xl`}
    >
      <div className="flex justify-between items-center pb-4 border-b border-b-gray-400 mb-8">
        <h1 className="text-xl font-semibold">{title}</h1>
        <button
          type="submit"
          className="py-2 px-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600"
        >
          {submitButtonText}
        </button>
      </div>
      <div>{children}</div>
    </form>
  );
}

export default PanelForm;
