import React from "react";

function SystemNotFound() {
  return (
    <div className="flex justify-center mt-10 md:mt-16 lg:mt-20">
      <div>
        <h1 className="text-2xl font-semibold">Something went wrong...</h1>
        <p className="text-lg font-semibold text-slate-700">
          Sorry, the system you are looking for, doesn't exist in our database.
        </p>
      </div>
    </div>
  );
}

export default SystemNotFound;
