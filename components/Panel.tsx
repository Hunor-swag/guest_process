"use client";

import React from "react";

type Props = {
  width: string;
  height: string;
  title: string;
  bgcolor: string;
  children: React.ReactNode;
  buttonText: string;
  buttonClickHandler: () => void;
};

function Panel({
  width,
  height,
  bgcolor,
  title,
  children,
  buttonText,
  buttonClickHandler,
}: Props) {
  return (
    <div
      className={`w-${width} h-${height} bg-${bgcolor} py-4 md:px-8 px-2 rounded-xl`}
    >
      <div className="flex justify-between items-center pb-4 border-b border-b-gray-400 mb-8 p-2">
        <h1 className="text-xl font-semibold">{title}</h1>
        <button
          type="button"
          onClick={buttonClickHandler}
          className="py-2 px-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600"
        >
          {buttonText}
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Panel;
