import { auth } from "@/app/(auth)/auth";
import { google } from "@ai-sdk/google";
import { streamText, UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { id, messages }: { id: string; messages: Array<UIMessage> } =
    await req.json();

  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages,
  });

  return result.toDataStreamResponse();
}
