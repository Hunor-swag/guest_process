"use client";

import SystemNotFound from "@/components/SystemNotFound";
import { useGlobalContext } from "@/components/context/GlobalContextProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";

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

  return isLoading ? (
    <div className="h-screen w-screen flex justify-center items-center">
      <Loading />
    </div>
  ) : (
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
