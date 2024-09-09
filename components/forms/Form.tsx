import { ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/forms";
import { Spinner } from "@/components/common";

interface Config {
  lebalText: string;
  labelId: string;
  type: string;
  value: string;
  required?: boolean;
}

interface Props {
  config: Config[];
  btnText: string;
  isLoading: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({
  config,
  btnText,
  isLoading,
  onChange,
  onSubmit,
}: Props) {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {config.map((input) => (
        <Input
          key={input.labelId}
          labelId={input.labelId}
          type={input.type}
          onChange={onChange}
          value={input.value}
          required={input.required}
        >
          {input.lebalText}
        </Input>
      ))}
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoading ? <Spinner sm /> : `${btnText}`}
        </button>
      </div>
    </form>
  );
}
