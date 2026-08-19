import type { Chat, ChatMessage, ChatsResponse } from "./message-types";

const staticAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhODE0MzRhY2M0OGVlODU2MGEwYjM2YSIsImlhdCI6MTc4Njg1NjI3OCwiZXhwIjoxNzg3NDYxMDc4fQ.TnbrIwpTFYJEsO5MoF-DrWMKo0DJXOIQgIoc8W9d2js";

const getApiBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5008/api/v1";

const apiRequest = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    credentials: "include",
    ...init,
    headers: {
      Authorization: `Bearer ${staticAccessToken}`,
      ...init?.headers,
    },
  });

  const payload: { message?: string; data?: T } = await response.json().catch(() => ({}));

  if (!response.ok || !payload.data) {
    throw new Error(payload.message || "Something went wrong. Please try again.");
  }

  return payload.data;
};

export const getChats = () => apiRequest<ChatsResponse>("/messages");

export const getMessages = (chatId: string) =>
  apiRequest<ChatMessage[]>(`/messages/${chatId}/messages`);

export const sendMessage = async ({
  chatId,
  content,
  files,
}: {
  chatId: string;
  content: string;
  files: File[];
}) => {
  const formData = new FormData();
  formData.append("chatId", chatId);
  formData.append("content", content);
  formData.append("contentType", files.length ? "file" : "text");
  files.forEach((file) => formData.append("files", file));

  return apiRequest<ChatMessage>(`/messages/${chatId}/message`, {
    method: "POST",
    body: formData,
  });
};

export const createChat = (participantId: string) =>
  apiRequest<Chat>("/messages/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ participantId }),
  });
