"use client";

import RegisterSystem from "@/components/register-system/RegisterSystem";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);

    if (session) {
      router.push("/user");
    } else {
      router.push("/auth/sign-in");
    }
  }, []);

  return <div></div>;
}
