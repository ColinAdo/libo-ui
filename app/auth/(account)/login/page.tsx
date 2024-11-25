import type { Metadata } from "next";
import { SquareLibrary } from "lucide-react";
import AuthTabs from "@/components/auth/AuthTabs";

export const metadata: Metadata = {
  title: "Libo | Login",
  description: "Libo Login page",
};

export default function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-0">
        <SquareLibrary className="mx-auto h-10 w-auto" />
        <h2 className="mt-1 text-center text-2xl dark:text-white font-mono font-bold leading-9 tracking-tight text-gray-900">
          Libo
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthTabs />
      </div>
    </div>
  );
}
