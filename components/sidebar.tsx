"use client";

import { SidebarHistory } from "./sidebar-history";

export function Sidebar() {
  return (
    <div className="z-20 dark:bg-black bg-white shrink-0 w-64 h-screen overflow-y-auto">
      <div className="h-full w-64">
        <div className="flex h-full min-h-0 flex-col">
          <div className="relative h-full w-full flex-1 items-start border-r border-zinc-700">
            <h2 className="sr-only">チャット履歴</h2>
            <nav className="flex h-full w-full flex-col pl-3">
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
