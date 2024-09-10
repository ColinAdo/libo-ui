import { useState, ChangeEvent, FormEvent } from "react";
import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";

export default function usePasswordReset() {
  const [passwordReset, { isLoading }] = useResetPasswordMutation();

  const [email, setEmail] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    passwordReset(email)
      .unwrap()
      .then(() => {
        toast.success("Please check your email address to reset your password");
      })
      .catch(() => {
        toast.error("Failed to request password");
      });
  };
  return {
    email,
    isLoading,
    onChange,
    onSubmit,
  };
}
