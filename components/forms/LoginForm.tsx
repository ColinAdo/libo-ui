"use client";

import { Form } from "@/components/forms";
import { useLogin } from "@/hooks";

export default function LoginForm() {
  const { email, password, isLoading, onChange, onSubmit } = useLogin();
  const config = [
    {
      lebalText: "Email Address",
      labelId: "email",
      type: "email",
      value: email,
      required: true,
    },
    {
      lebalText: "Password",
      labelId: "password",
      type: "password",
      value: password,
      link: {
        linkText: "Forgot password?",
        linkUrl: "/password-reset",
      },
      required: true,
    },
  ];

  return (
    <Form
      config={config}
      btnText="Sign in"
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
