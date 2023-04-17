import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-screen bg-orange-400">
      <div className="flex justify-center py-6 lg:py-0 px-20 lg:w-1/2 items-center">
        <h1>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
          possimus optio repellendus magni minima doloribus natus! Ducimus et
          officiis facilis ad cupiditate natus doloribus laudantium, dolor
          laborum, commodi numquam. Eum.
        </h1>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:flex-row lg:justify-end md:p-12 lg:p-16 lg:px-24 sm:p-2">
        <div className="bg-white w-full rounded-2xl items-stretch md:w-[600px] flex flex-col justify-center p-20 lg:px-10">
          <div className="flex flex-col items-center lg:px-10 md:px-2 pb-16 lg:pb-20 h-full">
            {children}
          </div>
          <div className="flex justify-between">
            <div>Language: TODO</div>
            <div className="flex flex-row">
              <div className="mx-1">
                <Link className="link" href="/terms">
                  Terms
                </Link>
              </div>
              <div className="mx-1">
                <Link className="link" href="/plans">
                  Plans
                </Link>
              </div>
              <div className="mx-1">
                <Link className="link" href="/contact-us">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
