"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ChatList } from "./chat-list";
import { ConversationPanel } from "./conversation-panel";
import { getChats, getMessages, sendMessage } from "./message-api";
import type { ChatMessage } from "./message-types";

const chatsQueryKey = ["chats"] as const;
const messagesQueryKey = (chatId: string) => ["messages", chatId] as const;

function MessageSkeleton() {
  return (
    <div
      aria-label="Loading conversations"
      aria-busy="true"
      className="flex h-[calc(100svh-12rem)] min-h-[520px] flex-col overflow-hidden rounded-md bg-white sm:h-[700px] lg:grid lg:h-[680px] lg:grid-cols-[320px_minmax(0,1fr)]"
    >
      <aside className="border-r border-slate-100 p-4">
        <Skeleton className="h-10 w-full rounded-md" />
        <div className="mt-5 space-y-4">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton className="size-11 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="hidden min-h-0 flex-col bg-[#f8f9fa] lg:flex">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-100 bg-white px-4">
          <Skeleton className="size-8 rounded-full" />
          <div className="space-y-1.5"><Skeleton className="h-3.5 w-28" /><Skeleton className="h-2.5 w-16" /></div>
        </header>
        <div className="flex-1 space-y-4 p-4">
          <Skeleton className="h-12 w-2/5 rounded-lg" />
          <Skeleton className="ml-auto h-16 w-1/2 rounded-lg" />
          <Skeleton className="h-12 w-1/3 rounded-lg" />
        </div>
        <div className="border-t border-slate-100 bg-white p-3"><Skeleton className="h-10 w-full rounded-md" /></div>
      </section>
    </div>
  );
}

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

        <div className="overflow-hidden rounded-lg bg-[#dceeff] p-2 shadow-sm sm:p-5">
          {isChatsLoading ? (
            <MessageSkeleton />
          ) : isChatsError ? (
            <div className="grid min-h-[460px] place-items-center rounded-md bg-white p-6 text-center text-sm text-rose-600">Could not load conversations. Please refresh and try again.</div>
          ) : !chats.length ? (
            <div className="grid min-h-[460px] place-items-center rounded-md bg-white p-6 text-center"><div><h2 className="text-lg font-semibold text-slate-800">No conversations yet</h2><p className="mt-1 text-sm text-slate-500">Your messages with service professionals will appear here.</p></div></div>
          ) : (
            <div className="flex h-[calc(100svh-12rem)] min-h-[520px] flex-col overflow-hidden rounded-md bg-white sm:h-[700px] lg:grid lg:h-[680px] lg:grid-cols-[320px_minmax(0,1fr)]">
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
