import { chatModels } from "@/lib/models";
import { DownIcon } from "./icon";
import { useState } from "react";

export function ModelSelector({ chatModel }: { chatModel: string }) {
  const [modelId, setModelId] = useState(chatModel);
  const selectedChatModel = chatModels.find(
    (chatModel) => chatModel.id === modelId,
  );

  if (!selectedChatModel) {
    throw new Error("Invalid chat model selected");
  }

  return (
    <div className="relative inline-block">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm"
          aria-haspopup="true"
        >
          {selectedChatModel.name}
          <DownIcon />
        </button>
      </div>
    </div>
  );
}
