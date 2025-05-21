"use client";

import { Session } from "next-auth";
import { AvatarMenu } from "./avatar-menu";
import { useSidebar } from "./sidebar";
import { SidebarIcon } from "./icon";

export function ChatHeader({ session }: { session: Session }) {
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
          </>
        )}
      </div>
      <AvatarMenu session={session} />
    </header>
  );
}
