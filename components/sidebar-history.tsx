"use client";

import { Chat } from "@/app/generated/prisma";
import { ChatItem } from "./chat-item";
import { useParams, useRouter } from "next/navigation";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { useState } from "react";
import { DeleteModal } from "./delete-modal";
import toast from "react-hot-toast";

export function SidebarHistory() {
  const { id } = useParams();
  const router = useRouter();
  const [deleteChat, setDeleteChat] = useState<Chat | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    data: chats,
    isLoading,
    mutate,
  } = useSWR<Chat[]>("/api/history", fetcher, {});

  const handleDeleteChat = async () => {
    const deletePromise = fetch(`/api/chat?id=${deleteChat!.id}`, {
      method: "DELETE",
    });

    toast.promise(deletePromise, {
      loading: "チャットを削除中...",
      success: () => {
        mutate((chats) => {
          if (chats) {
            return chats.map((chat) => ({
              ...chat,
              chats: chats.filter((chat) => chat.id !== deleteChat!.id),
            }));
          }
        });

        return "チャットが正常に削除されました";
      },
      error: "チャットの削除に失敗しました",
    });

    setShowDeleteModal(false);

    if (deleteChat!.id === id) {
      router.push("/");
    }
  };

  if (isLoading) {
    return (
      <div className="relative flex w-full min-w-0 flex-col p-2">
        <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
          読み込み中...
        </div>
      </div>
    );
  }
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
                          <ChatItem
                            key={chat.id}
                            chat={chat}
                            onDelete={() => {
                              setDeleteChat(chat);
                              setShowDeleteModal(true);
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
          </div>
        </div>
      </div>
      <DeleteModal
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        chatTitle={deleteChat?.title}
        onDelete={handleDeleteChat}
      />
    </>
  );
}
