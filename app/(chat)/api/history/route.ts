import { auth } from "@/app/(auth)/auth";
import { getChatsByUserId } from "@/lib/db";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json("Unauthorized!", { status: 401 });
  }

  try {
    const chats = await getChatsByUserId({
      id: session.user.id,
    });

    return Response.json(chats);
  } catch (_) {
    return Response.json("Failed to fetch chats!", { status: 500 });
  }
}
