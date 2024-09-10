"use client";

import { Form } from "@/components/forms";
import { usePasswordResetConfirm } from "@/hooks";

interface Props {
  uid: string;
  token: string;
}

export default function PasswordResetConfirmForm({ uid, token }: Props) {
  const { new_password, re_new_password, isLoading, onChange, onSubmit } =
    usePasswordResetConfirm(uid, token);
  const config = [
    {
      lebalText: "New password",
      labelId: "new_password",
      type: "password",
      value: new_password,
      required: true,
    },
    {
      lebalText: "Confirm new password",
      labelId: "re_new_password",
      type: "password",
      value: re_new_password,
      required: true,
    },
  ];

  return (
    <Form
      config={config}
      btnText="Reset password"
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
