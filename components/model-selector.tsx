import { chatModels } from "@/lib/models";
import { CheckIcon, DownIcon } from "./icon";
import { useState } from "react";
import { saveChatModelAsCookie } from "@/app/(chat)/actions";
import { useDropdown } from "@/hooks/use-dropdown";

export function ModelSelector({ chatModel }: { chatModel: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modelId, setModelId] = useState(chatModel);
  const selectedChatModel = chatModels.find(
    (chatModel) => chatModel.id === modelId,
  );

  if (!selectedChatModel) {
    throw new Error("Invalid chat model selected");
  }

  const menuRef = useDropdown<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  return (
    <div className="relative inline-block" ref={menuRef}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm"
          aria-haspopup="true"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedChatModel.name}
          <DownIcon />
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 dark:bg-zinc-800 ring-black/5 focus:outline-hidden block opacity-100">
          <div className="py-1" role="none">
            {chatModels.map((model) => {
              const { id } = model;

              return (
                <button
                  key={id}
                  className="gap-4 group/item flex justify-between items-center p-2"
                  onClick={() => {
                    setIsOpen(false);
                    setModelId(id);
                    saveChatModelAsCookie(id);
                  }}
                >
                  <div className="flex flex-col gap-1 items-start">
                    <div>{model.name}</div>
                    <div className="text-xs text-muted-foreground text-zinc-500 text-left">
                      {model.description}
                    </div>
                  </div>
                  {modelId === id && <CheckIcon />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
