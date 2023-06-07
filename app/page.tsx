"use client";

import RegisterSystem from "@/components/register-system/RegisterSystem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  const [subdomain, setSubdomain] = useState("");

  useEffect(() => {
    const hostname = window.location.hostname;
    const subdomain = hostname.split(".")[0];
    setSubdomain(subdomain);

    if (subdomain === "register") {
      console.log(subdomain);
      return;
    }
    if (session.data) {
      router.push("/user");
    } else {
      router.push("/auth/sign-in");
    }
  }, []);

  return <div>{subdomain === "register" && <RegisterSystem />}</div>;
}
