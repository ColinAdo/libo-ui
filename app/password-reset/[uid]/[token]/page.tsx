import PasswordResetConfirmForm from "@/components/auth/PasswordResetConfirmForm";
import { SquareLibrary } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libo | Password Reset",
  description: "Libo Password reset confirm page",
};

interface Props {
  params: {
    uid: string;
    token: string;
  };
}

export default function Page({ params: { uid, token } }: Props) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-0">
        <SquareLibrary className="mx-auto h-10 w-auto" />
        <h2 className="mt-1 text-center dark:text-white text-2xl font-mono font-bold leading-9 tracking-tight text-gray-900">
          Libo
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <PasswordResetConfirmForm uid={uid} token={token} />
      </div>
    </div>
  );
}
