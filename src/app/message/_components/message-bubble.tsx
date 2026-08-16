import { Download, FileText } from "lucide-react";
import type { ChatMessage } from "./message-types";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const messageTime = new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[82%] sm:max-w-[68%] ${message.isMe ? "items-end" : "items-start"}`}>
        {message.content && <p className={`rounded-lg px-3 py-2 text-sm leading-5 ${message.isMe ? "rounded-br-sm bg-[#2a9fe9] text-white" : "rounded-bl-sm bg-[#2674b7] text-white"}`}>{message.content}</p>}
        {!!message.fileUrl?.length && (
          <div className={`mt-1 grid gap-2 ${message.fileUrl.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
            {message.fileUrl.map((file) =>
              file.content === "image" ? (
                // API image URLs can be hosted by different providers.
                // eslint-disable-next-line @next/next/no-img-element
                <img key={file._id || file.url} src={file.url} alt={file.name} className="max-h-56 rounded-lg object-cover" />
              ) : (
                <a key={file._id || file.url} href={file.url} target="_blank" rel="noreferrer" className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${message.isMe ? "bg-sky-100 text-sky-900" : "bg-slate-100 text-slate-700"}`}>
                  <FileText className="size-4 shrink-0" />
                  <span className="min-w-0 flex-1 truncate">{file.name}</span>
                  <Download className="size-4 shrink-0" />
                </a>
              )
            )}
          </div>
        )}
        <time className="mt-1 block text-[10px] text-slate-400">{messageTime}</time>
      </div>
    </div>
  );
}
