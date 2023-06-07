"use client";

import RegisterSystem from "@/components/register-system/RegisterSystem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  let subdomain = "";

  useEffect(() => {
    let subdomainPromise = new Promise<string>((resolve, reject) => {
      resolve(window.location.host.split(".")[0]);
    });

    const getSubdomain = async () => {
      subdomain = await subdomainPromise;
    };

    getSubdomain();

    if (subdomain === "register") return;
    if (session.data) {
      router.push("/user");
    } else {
      router.push("/auth/sign-in");
    }
  }, []);

  // useEffect(() => {}, []);

  return <>{subdomain === "register" && <RegisterSystem />}</>;
}
