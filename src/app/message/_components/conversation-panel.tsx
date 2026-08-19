import { ChevronLeft, Phone } from "lucide-react";
import { useEffect, useRef } from "react";
import { ChatAvatar } from "./chat-avatar";
import { MessageBubble } from "./message-bubble";
import { MessageComposer } from "./message-composer";
import type { Chat, ChatMessage } from "./message-types";

type ConversationPanelProps = {
  chat?: Chat;
  messages: ChatMessage[];
  isLoading: boolean;
  isError: boolean;
  onSend: (content: string, files: File[]) => void;
  isSending: boolean;
  onBack?: () => void;
  className?: string;
};

export function ConversationPanel({ chat, messages, isLoading, isError, onSend, isSending, onBack, className = "" }: ConversationPanelProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, chat?._id]);

  if (!chat) {
    return (
      <section className={`min-h-0 flex-1 flex-col items-center justify-center bg-white p-8 text-center text-sm text-slate-500 ${className}`}>
        Select a conversation to view messages.
      </section>
    );
  }

  return (
    <section className={`min-h-0 flex-1 flex-col bg-[#f8f9fa] ${className}`}>
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-100 bg-white px-4">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to conversations"
            className="grid size-8 shrink-0 place-items-center rounded-md text-slate-600 transition hover:bg-slate-100 lg:hidden"
          >
            <ChevronLeft className="size-5" />
          </button>
        ) : null}
        <ChatAvatar name={chat.title || "Conversation"} imageUrl={chat.imageUrl} className="size-8" />
        <div className="min-w-0 flex-1"><h2 className="truncate text-sm font-semibold text-slate-800">{chat.title || "Conversation"}</h2><p className="text-[10px] text-slate-500">Conversation</p></div>
        <Phone className="size-4 text-slate-700" aria-label="Call unavailable" />
      </header>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
        {isLoading && <p className="py-8 text-center text-sm text-slate-500">Loading messages…</p>}
        {isError && <p className="py-8 text-center text-sm text-rose-600">Could not load messages. Please select the chat again.</p>}
        {!isLoading && !isError && !messages.length && <p className="py-8 text-center text-sm text-slate-500">No messages yet. Say hello!</p>}
        {messages.map((message) => <MessageBubble key={message._id} message={message} />)}
        <div ref={endRef} />
      </div>
      <MessageComposer onSend={onSend} isSending={isSending} />
    </section>
  );
}
