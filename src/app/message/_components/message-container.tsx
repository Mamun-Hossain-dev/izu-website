"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ChatList } from "./chat-list";
import { ConversationPanel } from "./conversation-panel";
import { getChats, getMessages, sendMessage } from "./message-api";
import type { ChatMessage } from "./message-types";

const chatsQueryKey = ["chats"] as const;
const messagesQueryKey = (chatId: string) => ["messages", chatId] as const;

const MessageContainer = () => {
  const queryClient = useQueryClient();
  const [selectedChatId, setSelectedChatId] = useState<string>();
  const [search, setSearch] = useState("");

  const { data: chatsData, isLoading: isChatsLoading, isError: isChatsError } = useQuery({
    queryKey: chatsQueryKey,
    queryFn: getChats,
  });

  const chats = useMemo(
    () => [...(chatsData?.activeChats || []), ...(chatsData?.nonActiveChats || [])],
    [chatsData]
  );
  const selectedChat = chats.find((chat) => chat._id === selectedChatId);

  useEffect(() => {
    if (!selectedChatId && chats.length) {
      setSelectedChatId(chats[0]._id);
    }
  }, [chats, selectedChatId]);

  const { data: messageData, isLoading: isMessagesLoading, isError: isMessagesError } = useQuery({
    queryKey: messagesQueryKey(selectedChatId || ""),
    queryFn: () => getMessages(selectedChatId!),
    enabled: Boolean(selectedChatId),
  });

  const messages = useMemo(
    () => [...(messageData || [])].sort((first, second) => new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime()),
    [messageData]
  );

  const sendMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (message) => {
      if (!selectedChatId) return;
      queryClient.setQueryData<ChatMessage[]>(messagesQueryKey(selectedChatId), (current = []) => [
        ...current,
        { ...message, isMe: true },
      ]);
      queryClient.invalidateQueries({ queryKey: chatsQueryKey });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const handleSend = (content: string, files: File[]) => {
    if (!selectedChatId) return;
    sendMutation.mutate({ chatId: selectedChatId, content, files });
  };

  return (
    <main className="bg-white px-4 py-10 sm:py-14">
      <section className="mx-auto max-w-6xl">
        <header className="mb-7 text-center">
          <h1 className="text-3xl font-semibold tracking-[-0.035em] text-slate-800">Message</h1>
          <p className="mt-2 text-sm text-slate-500">Stay connected with your service professionals.</p>
        </header>

        <div className="overflow-hidden rounded-lg bg-[#dceeff] p-3 shadow-sm sm:p-5">
          {isChatsLoading ? (
            <div className="grid min-h-[460px] place-items-center rounded-md bg-white text-sm text-slate-500">Loading conversations…</div>
          ) : isChatsError ? (
            <div className="grid min-h-[460px] place-items-center rounded-md bg-white p-6 text-center text-sm text-rose-600">Could not load conversations. Please refresh and try again.</div>
          ) : !chats.length ? (
            <div className="grid min-h-[460px] place-items-center rounded-md bg-white p-6 text-center"><div><h2 className="text-lg font-semibold text-slate-800">No conversations yet</h2><p className="mt-1 text-sm text-slate-500">Your messages with service professionals will appear here.</p></div></div>
          ) : (
            <div className="flex h-[640px] flex-col overflow-hidden rounded-md bg-white sm:h-[700px] lg:grid lg:h-[680px] lg:grid-cols-[320px_minmax(0,1fr)]">
              <ChatList
                className={`flex-col ${selectedChatId ? "hidden lg:flex" : "flex"}`}
                chats={chats}
                selectedChatId={selectedChatId}
                search={search}
                onSearchChange={setSearch}
                onSelect={setSelectedChatId}
              />
              <ConversationPanel
                className={selectedChatId ? "flex" : "hidden lg:flex"}
                onBack={selectedChatId ? () => setSelectedChatId(undefined) : undefined}
                chat={selectedChat}
                messages={messages}
                isLoading={isMessagesLoading}
                isError={isMessagesError}
                onSend={handleSend}
                isSending={sendMutation.isPending}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MessageContainer;
