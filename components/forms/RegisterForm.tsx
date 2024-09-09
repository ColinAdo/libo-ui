"use client";

import { Form } from "@/components/forms";
import { useRegister } from "@/hooks";

export default function RegisterForm() {
  const {
    username,
    email,
    password,
    re_password,
    isLoading,
    onChange,
    onSubmit,
  } = useRegister();
  const config = [
    {
      lebalText: "Username",
      labelId: "username",
      type: "text",
      value: username,
      required: true,
    },
    {
      lebalText: "Email",
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
      required: true,
    },
    {
      lebalText: "Confirm password",
      labelId: "re_password",
      type: "password",
      value: re_password,
      required: true,
    },
  ];

  return (
    <Form
      config={config}
      btnText="Sign up"
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
