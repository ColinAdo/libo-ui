"use client";

import { Form } from "@/components/forms";
import { usePasswordReset } from "@/hooks";

export default function PasswordResetForm() {
  const { email, isLoading, onChange, onSubmit } = usePasswordReset();
  const config = [
    {
      lebalText: "Email Address",
      labelId: "email",
      type: "email",
      value: email,
      required: true,
    },
  ];

  return (
    <Form
      config={config}
      btnText="Request reset password"
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
