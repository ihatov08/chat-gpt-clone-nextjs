import React from "react";

export default function AuthFooter() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="h-px px-4 sm:px-16 bg-zinc-200 dark:bg-zinc-600"></div>
        <span className="mx-4 my-2 text-sm text-zinc-500 dark:text-zinc-400 writing-mode-vertical-rl text-orientation-upright">
          または
        </span>
        <div className="h-px px-4 sm:px-16 bg-zinc-200 dark:bg-zinc-600"></div>
      </div>
      <div className="flex justify-center gap-4 mt-4 text-xs text-zinc-500 dark:text-zinc-400">
        <a href="/terms" className="hover:underline">
          利用規約
        </a>
        <span>|</span>
        <a href="/privacy" className="hover:underline">
          プライバシーポリシー
        </a>
      </div>
    </>
  );
}
