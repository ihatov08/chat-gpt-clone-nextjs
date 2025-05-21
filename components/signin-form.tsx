"use client";

import { AuthForm } from "./auth-form";
import { useState } from "react";
export function SigninForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (formData: FormData) => {
    // サインイン処理
    setEmail(formData.get("email") as string);
  };
  return (
    <AuthForm action={handleSubmit} email={email}>
      <button
        className="inline-flex items-center justify-center gap-2 rounded-md text-sm cursor-pointer border border-zinc-300 font-medium hover:bg-zinc-800 h-10 px-4 py-2"
        type="submit"
      >
        サインイン
      </button>
    </AuthForm>
  );
}
