"use client";

import AuthFooter from "@/components/auth-footer";
import GoogleLoginButton from "@/components/google-login-button";
import { SignupForm } from "@/components/signup-form";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl gap-6 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">
            アカウントの作成
          </h3>
        </div>
        <SignupForm />
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          すでにアカウントをお持ちですか？
          <Link
            className="font-semibold text-zinc-800 hover:underline dark:text-zinc-200"
            href="/signin"
          >
            サインイン
          </Link>
        </p>
        <div className="flex items-center justify-center">
          <div className="h-px px-4 sm:px-16 bg-zinc-200 dark:bg-zinc-600"></div>
          <span className="mx-4 my-2 text-sm text-zinc-500 dark:text-zinc-400 writing-mode-vertical-rl text-orientation-upright">
            または
          </span>
          <div className="h-px px-4 sm:px-16 bg-zinc-200 dark:bg-zinc-600"></div>
        </div>
        <GoogleLoginButton />
        <AuthFooter />
      </div>
    </div>
  );
}
