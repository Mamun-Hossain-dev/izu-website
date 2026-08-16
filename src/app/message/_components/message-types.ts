export type ChatParticipant = {
  _id: string;
  name: string;
  email?: string;
  profileImage?: string;
  phone?: string;
};

export type ChatFile = {
  _id?: string;
  name: string;
  content: string;
  url: string;
};

export type ChatMessage = {
  _id: string;
  chatId: string;
  sender: ChatParticipant;
  content: string;
  contentType: "text" | "image" | "video" | "audio" | "file";
  fileUrl: ChatFile[];
  createdAt: string;
  isMe: boolean;
};

export type Chat = {
  _id: string;
  participants: ChatParticipant[];
  title: string;
  imageUrl?: string;
  lastMessage: ChatMessage | null;
  updatedAt: string;
};

export type ChatsResponse = {
  activeChats: Chat[];
  nonActiveChats: Chat[];
};
