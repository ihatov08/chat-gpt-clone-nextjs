"use client";

import { useRouter } from "next/navigation";
import { AuthForm } from "./auth-form";
import { useActionState, useEffect, useState } from "react";
import { Signup, SignupActionState } from "@/app/(auth)/actions";

export function SignupForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [state, formAction] = useActionState<SignupActionState, FormData>(
    Signup,
    {
      status: "idle",
    },
  );

  useEffect(() => {
    if (state.status === "success") {
      router.push("/");
    } else if (state.status === "idle") {
      console.log("idle");
    } else {
      alert(state.status);
    }
  }, [state]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };
  return (
    <AuthForm action={handleSubmit} email={email}>
      <button
        className="inline-flex items-center justify-center gap-2 border dark:hover:bg-zinc-800 border-zinc-200 rounded-md text-sm cursor-pointer font-medium hover:bg-zinc-200 h-10 px-4 py-2"
        type="submit"
      >
        アカウント登録
      </button>
    </AuthForm>
  );
}
