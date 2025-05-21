import { Chat } from "@/app/generated/prisma";
import Link from "next/link";
import { EllipsisIcon, TrashIcon } from "./icon";
import { useState } from "react";

export const ChatItem = ({ chat }: { chat: Chat }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div className="group rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 h-9 text-sm relative">
        <div className="flex justify-between items-center px-1">
          <Link
            href={`/chat/${chat.id}`}
            className="flex items-center gap-2 p-2"
          >
            <div
              className="relative grow overflow-hidden whitespace-nowrap"
              dir="auto"
            >
              <p className="truncate w-[150px]">{chat.title ?? chat.id}</p>
            </div>
          </Link>
          <button onClick={() => setIsOpen(!isOpen)}>
            <EllipsisIcon />
          </button>
        </div>
        {isOpen && (
          <div className="absolute z-30 mt-2 w-32 right-0 rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black/5 focus:outline-hidden">
            <div className="py-1" role="none">
              <button className="gap-4 group/item flex justify-between items-center p-2">
                <TrashIcon />
                <div className="flex flex-col gap-1 items-start text-red-400">
                  <div>削除</div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
