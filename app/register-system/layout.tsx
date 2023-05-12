import { useDictionary } from "@/hooks/useDictionary";

function RegisterSystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center p-10">
      <div className="w-full md:w-3/4 lg:w-2/3 shadow-2xl border border-gray-400 rounded-lg p-10">
        {children}
      </div>
    </div>
  );
}

export default RegisterSystemLayout;
