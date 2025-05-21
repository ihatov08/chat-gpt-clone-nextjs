"use client";

import { Chat } from "@/app/generated/prisma";
import { ChatItem } from "./chat-item";

export function SidebarHistory() {
  const chats: Array<Chat> = [
    {
      id: "1",
      userId: "1",
      createdAt: new Date(),
    },
    {
      id: "2",
      userId: "1",
      createdAt: new Date(),
    },
  ];
  return (
    <>
      <div className="relative flex w-full min-w-0 flex-col p-2">
        <div className="w-full text-sm">
          <div className="flex w-full min-w-0 flex-col gap-1">
            {chats &&
              (() => {
                return (
                  <div className="flex flex-col gap-6">
                    {chats.length > 0 && (
                      <div>
                        {chats.map((chat) => (
                          <ChatItem key={chat.id} chat={chat} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
          </div>
        </div>
      </div>
    </>
  );
}
