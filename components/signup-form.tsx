"use client";

import { AuthForm } from "./auth-form";

export function SignupForm() {
  return (
    <AuthForm>
      <button
        className="inline-flex items-center justify-center gap-2 border dark:hover:bg-zinc-800 border-zinc-200 rounded-md text-sm cursor-pointer font-medium hover:bg-zinc-200 h-10 px-4 py-2"
        type="submit"
      >
        アカウント登録
      </button>
    </AuthForm>
  );
}
