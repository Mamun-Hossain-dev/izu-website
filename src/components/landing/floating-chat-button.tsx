import { Bot } from "lucide-react";

export function FloatingChatButton() {
  return (
    <button
      type="button"
      aria-label="Open support chat"
      className="fixed bottom-5 right-5 z-40 grid size-16 place-items-center rounded-[22px] border-2 border-[#a8a8a8] bg-white text-[#2c76b9] shadow-lg transition hover:-translate-y-1 sm:bottom-8 sm:right-8 sm:size-20"
    >
      <Bot className="size-9 sm:size-11" strokeWidth={2.3} />
    </button>
  );
}
