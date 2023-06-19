"use client";

import RegisterSystem from "@/components/register-system/RegisterSystem";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  const [subdomain, setSubdomain] = useState("");

  useEffect(() => {
    const hostname = window.location.hostname;
    const subdomain = hostname.split(".")[0];
    setSubdomain(subdomain);
    console.log(session);

    if (subdomain === "register") {
      return;
    }
    if (session) {
      router.push("/user");
    } else {
      router.push("/auth/sign-in");
    }
  }, []);

  return <div>{subdomain === "register" && <RegisterSystem />}</div>;
}
