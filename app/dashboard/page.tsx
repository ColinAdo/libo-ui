"use client";

import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { List, Spinner } from "@/components/common";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { data: user, isLoading, isError } = useRetrieveUserQuery();
  const config = [
    {
      label: "Username",
      value: user?.username,
    },
    {
      label: "Email",
      value: user?.email,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">
        <List config={config} />
      </main>
    </>
  );
}
