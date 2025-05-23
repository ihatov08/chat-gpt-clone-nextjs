import { prisma } from "./prisma";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }

  return user;
}

export async function createUser(email: string, passwordHash: string) {
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });

  return user;
}

export async function saveChat({
  id,
  userId,
  title,
}: {
  id: string;
  userId: string;
  title: string;
}) {
  const chat = await prisma.chat.create({
    data: {
      id,
      userId,
      title,
    },
  });

  return chat;
}

export async function saveMessage({
  message,
}: {
  message: {
    chatId: string;
    id: string;
    role: "user" | "assistant";
    parts: Array<object>;
  };
}) {
  return await prisma.message.create({ data: message });
}

export async function getChatById({ id }: { id: string }) {
  const chat = await prisma.chat.findUnique({
    where: {
      id,
    },
  });

  if (!chat) {
    return null;
  }

  return chat;
}

export async function getMessagesByChatId({ id }: { id: string }) {
  const messages = await prisma.message.findMany({
    where: {
      chatId: id,
    },
  });

  return messages;
}

export async function getChatsByUserId({ id }: { id: string }) {
  const chats = await prisma.chat.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return chats;
}

export async function deleteChatById({ id }: { id: string }) {
  const chat = await prisma.$transaction(async (prisma) => {
    await prisma.message.deleteMany({
      where: {
        chatId: id,
      },
    });
    return await prisma.chat.delete({
      where: {
        id,
      },
    });
  });

  return chat;
}
