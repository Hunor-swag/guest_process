"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useHotelSystem } from "@/store/store";

function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  const { subdomain } = useHotelSystem();

  useEffect(() => {
    if (session) {
      router.push("/user");
    }
  }, []);

  return (
    <div>
      <h1>{subdomain}</h1>
    </div>
  );
}

export default Home;
