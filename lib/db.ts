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
}: {
  id: string;
  userId: string;
}) {
  const chat = await prisma.chat.create({
    data: {
      id,
      userId,
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
