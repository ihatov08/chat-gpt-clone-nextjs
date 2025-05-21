"use client";

import { useChat } from "@ai-sdk/react";
import { ChatInput } from "./chat-input";
import { Messages } from "./messages";
import { ChatHeader } from "./header";
import { Session } from "next-auth";
import { UIMessage } from "ai";

export function Chat({
  id,
  session,
  initialMessages,
}: { id: string; session: Session; initialMessages: Array<UIMessage> }) {
  const { messages, input, setInput, handleSubmit, status } = useChat({
    id,
    initialMessages,
  });

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <ChatHeader session={session} />
      <Messages messages={messages} />
      <ChatInput
        chatId={id}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        status={status}
      />
    </div>
  );
}
