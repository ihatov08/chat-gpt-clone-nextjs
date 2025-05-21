import { Chat } from "@/app/generated/prisma";
import Link from "next/link";

export const ChatItem = ({ chat }: { chat: Chat }) => {
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
              <p className="truncate w-[150px]">{chat.id}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
