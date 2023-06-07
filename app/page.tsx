"use client";

import RegisterSystem from "@/components/register-system/RegisterSystem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  let subdomain = "";
  useEffect(() => {
    subdomain = window.location.host.split(".")[0];
  }, []);

  useEffect(() => {
    console.log(subdomain);
    console.log(session.data);
    if (subdomain === "register") return;
    if (session.data) {
      router.push("/user");
    } else {
      router.push("/auth/sign-in");
    }
  }, []);

  return <>{subdomain === "register" && <RegisterSystem />}</>;
}
