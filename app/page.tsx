import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libo | Home",
  description: "Libo home page",
};

export default function Page() {
  return (
    <main className="bg-white dark:bg-zinc-950">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Libo application
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              This is a library application that allows you to read and chat
              with your pdf, after somedays the file will be sent into your
              email address.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth/login"
                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
