import { auth } from "@/app/(auth)/auth";
import { deleteChatById, getChatById, saveChat, saveMessage } from "@/lib/db";
import { myProvider } from "@/lib/models";
import { google } from "@ai-sdk/google";
import {
  appendResponseMessages,
  generateText,
  streamText,
  UIMessage,
} from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    id,
    messages,
    selectedModel,
  }: { id: string; messages: Array<UIMessage>; selectedModel: string } =
    await req.json();

  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const message = messages[0];

  const chat = await getChatById({ id });
  if (chat) {
    if (chat.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }
  } else {
    const { text: title } = await generateText({
      model: myProvider.languageModel(selectedModel),
      prompt: JSON.stringify(message),
      system: `
        - ユーザーが会話を始める最初のメッセージに基づいて、短いタイトルを生成します
        - タイトルは80文字以内に収めてください
        - タイトルはユーザーのメッセージの要約であるべきです
        - 引用符やコロンは使用しないでください
        - タイトルは日本語で生成してください
      `,
    });
    await saveChat({ id, userId: session.user.id, title });
  }

  await saveMessage({
    message: {
      chatId: id,
      id: message.id,
      role: "user",
      parts: message.parts,
    },
  });

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages,
    onFinish: async ({ response }) => {
      try {
        const [, assistantMessage] = appendResponseMessages({
          messages: [message],
          responseMessages: response.messages,
        });

        await saveMessage({
          message: {
            id: assistantMessage.id,
            chatId: id,
            role: "assistant",
            parts: assistantMessage.parts ?? [],
          },
        });
      } catch (_) {
        console.error("チャットの保存に失敗しました");
      }
    },
  });

  return result.toDataStreamResponse();
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (!chat) {
      return new Response("Not Found", { status: 404 });
    }

    if (chat.userId !== session.user.id) {
      return new Response("Forbidden", { status: 403 });
    }

    const deletedChat = await deleteChatById({ id });

    return Response.json(deletedChat, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("チャットの削除に失敗しました", {
      status: 500,
    });
  }
}
