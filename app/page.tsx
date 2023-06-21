"use client";

import SystemNotFound from "@/components/SystemNotFound";
import { useGlobalContext } from "@/components/context/GlobalContextProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const context = useGlobalContext();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (context && context.hotel_object !== undefined) {
      setIsLoading(false);
    }
  }, [context]);

  useEffect(() => {
    if (isLoading) return;

    if (!context || !context.hotel_object) {
      router.push("/system-not-found");
    } else if (session) {
      router.push("/user");
    } else {
      router.push("/auth/sign-in");
    }
  }, [isLoading, context, session, router]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state while the context is being fetched
  }

  return <div></div>;
}
