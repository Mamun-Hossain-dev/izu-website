import { Search } from "lucide-react";
import { ChatAvatar } from "./chat-avatar";
import type { Chat } from "./message-types";

type ChatListProps = {
  chats: Chat[];
  selectedChatId?: string;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (chatId: string) => void;
  className?: string;
};

const getLastMessageText = (chat: Chat) => {
  if (!chat.lastMessage) return "No messages yet. Start the conversation.";
  if (chat.lastMessage.content) return chat.lastMessage.content;
  if (chat.lastMessage.fileUrl?.length) return `📎 ${chat.lastMessage.fileUrl.length} attachment${chat.lastMessage.fileUrl.length > 1 ? "s" : ""}`;
  return "New message";
};

export function ChatList({ chats, selectedChatId, search, onSearchChange, onSelect, className = "" }: ChatListProps) {
  const visibleChats = chats.filter((chat) =>
    chat.title.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())
  );

  return (
    <aside className={`min-h-0 border-b border-sky-100 bg-white p-3 lg:border-b-0 lg:border-r ${className}`}>
      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search conversations" className="h-10 w-full rounded-md border border-[#2674b7] bg-white pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#2674b7]/20" />
      </label>

      <div className="mt-3 min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
        {visibleChats.map((chat) => {
          const active = chat._id === selectedChatId;
          return (
            <button key={chat._id} type="button" onClick={() => onSelect(chat._id)} className={`flex w-full items-center gap-3 rounded-md p-2 text-left transition ${active ? "bg-[#e7f3ff]" : "hover:bg-slate-50"}`}>
              <ChatAvatar name={chat.title} imageUrl={chat.imageUrl} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-slate-800">{chat.title || "Conversation"}</span>
                  {chat.lastMessage && <time className="shrink-0 text-[10px] text-slate-400">{new Date(chat.lastMessage.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time>}
                </span>
                <span className="mt-0.5 block truncate text-xs text-slate-500">{getLastMessageText(chat)}</span>
              </span>
            </button>
          );
        })}
        {!visibleChats.length && <p className="px-2 py-8 text-center text-sm text-slate-500">No conversations found.</p>}
      </div>
    </aside>
  );
}
