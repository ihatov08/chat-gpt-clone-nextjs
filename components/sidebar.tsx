"use client";

import { useRouter } from "next/navigation";
import { NewChatIcon, SidebarIcon } from "./icon";
import { SidebarHistory } from "./sidebar-history";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const SidebarProvider = ({
  defaultOpen = true,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
}) => {
  const [open, _setOpen] = useState(defaultOpen);

  const setOpen = useCallback(
    (value: boolean) => {
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      _setOpen(value);
    },
    [_setOpen],
  );

  const toggleSidebar = useCallback(() => {
    setOpen(!open);
  }, [setOpen, open]);

  const contextValue = useMemo<SidebarContext>(
    () => ({
      open,
      toggleSidebar,
    }),
    [open, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div className="group/sidebar-wrapper flex min-h-svh w-full" {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
};
SidebarProvider.displayName = "SidebarProvider";

type SidebarContext = {
  open: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContext | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function Sidebar() {
  const router = useRouter();
  const { open, toggleSidebar } = useSidebar();
  if (!open) {
    return <div className="hidden"></div>;
  }
  return (
    <div className="z-20 dark:bg-black bg-white shrink-0 w-64 h-screen overflow-y-auto">
      <div className="h-full w-64">
        <div className="flex h-full min-h-0 flex-col">
          <div className="relative h-full w-full flex-1 items-start border-r border-zinc-700">
            <h2 className="sr-only">チャット履歴</h2>
            <nav className="flex h-full w-full flex-col pl-3">
              <div
                id="sidebar-header"
                className="flex justify-between h-16 items-center pr-3"
              >
                <span className="flex">
                  <button
                    className="hover:bg-zinc-200 dark:hover:bg-zinc-700 h-10 rounded-lg px-2"
                    aria-label="サイドバーを閉じる"
                    onClick={toggleSidebar}
                  >
                    <SidebarIcon />
                  </button>
                </span>
                <span className="flex">
                  <button
                    aria-label="新しいチャット"
                    className="hover:bg-zinc-200 dark:hover:bg-zinc-700 h-10 rounded-lg px-2"
                    onClick={() => {
                      router.push("/");
                      router.refresh();
                    }}
                  >
                    <NewChatIcon />
                  </button>
                </span>
              </div>
              <div className="flex-col flex-1 transition-opacity duration-500 relative pr-3 overflow-y-auto">
                <div id="sidebar" className="group/sidebar">
                  <div className="flex flex-col gap-2 text-sm">
                    <div>
                      <div className="relative first:mt-0 last:mb-5">
                        <SidebarHistory />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
