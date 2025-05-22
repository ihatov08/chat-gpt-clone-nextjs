import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function DeleteModal({
  open,
  setOpen,
  chatTitle,
  onDelete,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  chatTitle: string | undefined | null;
  onDelete: () => void;
}) {
  if (!open) return null;

  const modal = (
    <div
      className={`fixed inset-0 z-50 ${open ? "ease-out duration-300 opacity-100" : "ease-in duration-200 opacity-0"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div
          className={`flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ${open ? "ease-out duration-300 translate-y-0 sm:scale-100" : "ease-in duration-200 translate-y-4 sm:translate-y-0 sm:scale-95"}`}
        >
          <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-zinc-800 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-base font-semibold" id="modal-title">
                  チャットを削除しますか？
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    <span className="font-bold">{chatTitle}</span>を削除します。
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => onDelete()}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                削除する
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md dark:bg-zinc-800 px-3 py-2 text-sm font-semibold dark:text-zinc-300 shadow-xs ring-1 ring-zinc-600 ring-inset hover:bg-zinc-200 dark:hover:bg-zinc-700 sm:w-auto"
              >
                キャンセルする
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return createPortal(modal, document.body);
}
