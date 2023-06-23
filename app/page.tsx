"use client";

import SystemNotFound from "@/components/SystemNotFound";
import { useGlobalContext } from "@/components/context/GlobalContextProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/user");
    }
  }, []);

  return <div></div>;
}
