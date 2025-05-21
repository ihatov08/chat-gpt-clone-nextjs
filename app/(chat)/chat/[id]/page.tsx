import { notFound, redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { Chat } from "@/components/chat";
import { getChatById, getMessagesByChatId } from "@/lib/db";
import { Message } from "@/app/generated/prisma";
import { UIMessage } from "ai";
import { cookies } from "next/headers";
import { DEFAULT_CHAT_MODEL } from "@/lib/models";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const chat = await getChatById({ id });

  if (!chat) {
    notFound();
  }

  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const messagesFromDB = await getMessagesByChatId({ id });

  function convertToUIMessages(messages: Array<Message>): Array<UIMessage> {
    return messages.map((message) => ({
      id: message.id,
      parts: message.parts as UIMessage["parts"],
      role: message.role as UIMessage["role"],
      content: "",
      createdAt: message.createdAt,
    }));
  }

  const messages = convertToUIMessages(messagesFromDB);

  const cookieStore = await cookies();
  const chatModelFromCookie = cookieStore.get("chat-model");

  return (
    <>
      <Chat
        id={chat.id}
        session={session}
        initialMessages={messages}
        chatModel={chatModelFromCookie?.value || DEFAULT_CHAT_MODEL}
      />
    </>
  );
}
