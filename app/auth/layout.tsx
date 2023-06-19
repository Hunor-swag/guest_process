import AuthLink from "@/components/auth/AuthLink";
import React from "react";
import dynamic from "next/dynamic";

const LanguageSelectorMenu = dynamic(
  () => import("@/components/language/LanguageSelectorMenu"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row w-screen bg-orange-400">
      <div className="flex justify-center py-6 lg:py-0 px-20 lg:w-1/2 items-center">
        <h1>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
          possimus optio repellendus magni minima doloribus natus! Ducimus et
          officiis facilis ad cupiditate natus doloribus laudantium, dolor
          laborum, commodi numquam. Eum.
        </h1>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:flex-row lg:justify-end md:p-12 lg:p-16 lg:px-24 p-4">
        <div className="bg-white w-full rounded-2xl items-stretch md:w-[600px] flex flex-col justify-center p-6 md:p-10">
          <div className="flex flex-col items-center lg:px-10 md:px-2 pb-16 lg:pb-20 h-full">
            {children}
          </div>
          <div className="flex justify-between flex-wrap">
            <div>
              <LanguageSelectorMenu />
            </div>
            <div className="flex flex-row flex-wrap">
              <AuthLink id={1} />
              <AuthLink id={2} />
              <AuthLink id={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
