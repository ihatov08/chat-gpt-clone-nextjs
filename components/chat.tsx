"use client";

import { useChat } from "@ai-sdk/react";
import { ChatInput } from "./chat-input";
import { Messages } from "./messages";
import { ChatHeader } from "./header";
import { Session } from "next-auth";

export function Chat({ id, session }: { id: string; session: Session }) {
  const { messages, input, setInput, handleSubmit, status } = useChat({ id });

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <ChatHeader session={session} />
      <Messages messages={messages} />
      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        status={status}
      />
    </div>
  );
}
