"use client";

import { useGlobalContext } from "@/components/context/GlobalContextProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

function HotelSystemProvider({ children }: Props) {
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
    console.log("loading...");

    if (!context || !context.hotel_object) {
      console.log("not found");
      router.push("/system-not-found");
    } else if (session) {
      console.log("session");
      router.push("/user");
    } else {
      console.log("sign-in");
      router.push("/auth/sign-in");
    }
  }, [isLoading, context, session, router]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state while the context is being fetched
  }

  return <>{children}</>;
}

export default HotelSystemProvider;
