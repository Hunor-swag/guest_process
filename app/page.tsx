"use client";

import { useGlobalContext } from "@/components/context/GlobalContextProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const context = useGlobalContext();

  useEffect(() => {
    console.log(session);
    console.log(context);

    if (session) {
      router.push("/user");
    } else {
      router.push("/auth/sign-in");
    }
  }, []);

  return <div></div>;
}
