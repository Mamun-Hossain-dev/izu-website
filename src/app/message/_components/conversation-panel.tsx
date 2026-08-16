import { Phone } from "lucide-react";
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
};

export function ConversationPanel({ chat, messages, isLoading, isError, onSend, isSending }: ConversationPanelProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, chat?._id]);

  if (!chat) {
    return <section className="grid min-h-[430px] place-items-center bg-white p-8 text-center text-sm text-slate-500">Select a conversation to view messages.</section>;
  }

  return (
    <section className="flex min-h-[430px] flex-col bg-[#f8f9fa]">
      <header className="flex h-14 items-center gap-3 border-b border-slate-100 bg-white px-4">
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
