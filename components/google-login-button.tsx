"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { useSession } from "next-auth/react";
import { googleSignIn } from "@/app/(auth)/actions";
import { useEffect } from "react";
import { GoogleIcon } from "./icon";
import toast from "react-hot-toast";

export default function GoogleLoginButton() {
  const router = useRouter();

  const [state, formAction] = useActionState(googleSignIn, {
    status: "idle",
  });

  const { update: updateSession } = useSession();

  useEffect(() => {
    if (state.status === "failed") {
      toast.error("サインインに失敗しました。");
    } else if (state.status === "success") {
      toast.success("サインインに成功しました。");
      updateSession();
      router.refresh();
    }
  }, [state]);

  const handleGoogleSignIn = async () => {
    formAction();
  };

  return (
    <form
      action={handleGoogleSignIn}
      className="flex flex-col gap-4 px-4 sm:px-16"
    >
      <button
        className="inline-flex items-center justify-center gap-2 border border-zinc-200 rounded-md text-sm cursor-pointer font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800 h-10 px-4 py-2"
        type="submit"
      >
        <GoogleIcon />
        Google で続行
      </button>
    </form>
  );
}
