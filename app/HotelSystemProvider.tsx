"use client";

import SystemNotFound from "@/components/SystemNotFound";
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

    if (
      context &&
      context.hotel_object !== undefined &&
      context.hotel_object !== null
    ) {
      if (!session) {
        router.push("/auth/sign-in");
      }
    }
  }, [context, router, session]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state while the context is being fetched
  }

  return (
    <>
      {context &&
      context.hotel_object !== undefined &&
      context.hotel_object !== null ? (
        children
      ) : (
        <SystemNotFound />
      )}
    </>
  );
}

export default HotelSystemProvider;
