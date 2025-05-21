import { Chat } from "@/components/chat";
import { auth } from "../(auth)/auth";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { DEFAULT_CHAT_MODEL } from "@/lib/models";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const id = randomUUID();

  const cookieStore = await cookies();
  const chatModelFromCookie = cookieStore.get("chat-model");

  return (
    <>
      <Chat
        id={id}
        session={session}
        initialMessages={[]}
        chatModel={chatModelFromCookie?.value || DEFAULT_CHAT_MODEL}
      />
    </>
  );
}
