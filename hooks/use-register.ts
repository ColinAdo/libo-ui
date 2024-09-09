import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";

export default function useRegister() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { username, email, password, re_password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    register({ username, email, password, re_password })
      .unwrap()
      .then(() => {
        toast.success("Please check your email to activate account");
        router.push("/auth/login");
      })
      .catch(() => {
        toast.error("Registration faild");
      });
  };
  return {
    username,
    email,
    password,
    re_password,
    isLoading,
    onChange,
    onSubmit,
  };
}
