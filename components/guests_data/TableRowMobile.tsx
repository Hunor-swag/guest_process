import { Guest } from "@/types/typings";
import React from "react";

type Props = {
  titleText: string;
  contentText: string;
};

function TableRowMobile({ titleText, contentText }: Props) {
  return (
    <li className="bg-gray-100 p-1 rounded-md flex relative">
      <span className="font-semibold self-start">{titleText}</span>
      <span className="self-center absolute left-[30%]">{contentText}</span>
    </li>
  );
}

export default TableRowMobile;
