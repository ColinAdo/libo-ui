"use client";

import { useSocialAuthenticateMutation } from "@/redux/features/authApiSlice";
import { Spinner } from "@/components/common";
import { useSocialAuth } from "@/hooks";

export default function Page() {
  const [googleAuthenticate] = useSocialAuthenticateMutation();
  useSocialAuth(googleAuthenticate, "google-oauth2");
  return (
    <div className="flex justify-center items-center my-8">
      <Spinner lg />
    </div>
  );
}
