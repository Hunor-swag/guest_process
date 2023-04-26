"use client";

type Props = {
  width: string;
  height: string;
  title: string;
  bgcolor: string;
  buttonText: string;
  children: React.ReactNode;
};

function Panel({ width, height, bgcolor, title, buttonText, children }: Props) {
  return (
    <div
      className={`w-${width} h-${height} bg-${bgcolor} py-4 px-8 rounded-xl`}
    >
      <div className="flex justify-between items-center pb-4 border-b border-b-gray-400 mb-8">
        <h1 className="text-xl font-semibold">{title}</h1>
        <button className="py-2 px-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600">
          {buttonText}
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Panel;
