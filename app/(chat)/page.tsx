export default function Page() {
  const messages = [
    {
      id: "1",
      role: "user",
      parts: [
        {
          type: "text",
          text: "こんにちは！",
        },
      ],
    },
    {
      id: "2",
      role: "assistant",
      parts: [
        {
          type: "text",
          text: "こんにちは！何かお手伝いできることはありますか？",
        },
      ],
    },
  ];
  return <>{JSON.stringify(messages)}</>;
}
