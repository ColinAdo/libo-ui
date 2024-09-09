import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/authApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "@/redux/features/authSlice";
import { toast } from "react-toastify";

export default function useLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login({ email, password })
      .unwrap()
      .then(() => {
        dispatch(setAuth());
        toast.success("Logged in");
        router.push("/dashboard");
      })
      .catch(() => {
        toast.error("Failed to login");
      });
  };
  return {
    email,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
