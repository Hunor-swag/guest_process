"use client";

import useDictionary from "@/hooks/useDictionary";
import Link from "next/link";
import React from "react";

export default function AuthLink({ id }: { id: number }) {
  const dict = useDictionary();
  let text = "";
  switch (id) {
    case 1:
      text = dict.links.terms;
      break;
    case 2:
      text = dict.links.plans;
      break;
    case 3:
      text = dict.links.contact;
      break;
    default:
      break;
  }
  return (
    <div className="mx-1">
      <Link className="link" href="/#">
        {text}
      </Link>
    </div>
  );
}
