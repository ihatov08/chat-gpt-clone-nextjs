"use client";

import { Session } from "next-auth";
import { AvatarMenu } from "./avatar-menu";
import { useSidebar } from "./sidebar";
import { NewChatIcon, SidebarIcon } from "./icon";
import { useRouter } from "next/navigation";
import { ModelSelector } from "./model-selector";

export function ChatHeader({
  session,
  chatModel,
}: { session: Session; chatModel: string }) {
  const router = useRouter();
  const { open, toggleSidebar } = useSidebar();
  return (
    <header className="flex sticky top-0 bg-background py-1.5 justify-between items-center px-2 md:px-2 gap-2 h-16">
      <div className="flex">
        {!open && (
          <>
            <span className="flex">
              <button
                className="fill-current hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:text-zinc-600 h-10 rounded-lg px-2"
                onClick={toggleSidebar}
              >
                <SidebarIcon />
              </button>
            </span>
            <span className="flex">
              <button
                className="hover:bg-zinc-200 dark:hover:bg-zinc-700 h-10 rounded-lg px-2 focus:outline-none"
                onClick={() => {
                  router.push("/");
                  router.refresh();
                }}
              >
                <NewChatIcon />
              </button>
            </span>
          </>
        )}
        <ModelSelector chatModel={chatModel} />
      </div>
      <AvatarMenu session={session} />
    </header>
  );
}
