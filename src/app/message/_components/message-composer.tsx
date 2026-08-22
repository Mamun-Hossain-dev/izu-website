import { FileText, Paperclip, Send, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

type MessageComposerProps = {
  onSend: (content: string, files: File[]) => void;
  isSending: boolean;
};

type PendingAttachment = {
  file: File;
  previewUrl?: string;
};

export function MessageComposer({ onSend, isSending }: MessageComposerProps) {
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<PendingAttachment[]>([]);
  const attachmentsRef = useRef<PendingAttachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);

  useEffect(() => {
    return () => {
      attachmentsRef.current.forEach((attachment) => {
        if (attachment.previewUrl) URL.revokeObjectURL(attachment.previewUrl);
      });
    };
  }, []);

  const addFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedAttachments = Array.from(event.target.files || []).map((file) => ({
      file,
      previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));
    setAttachments((current) => [...current, ...selectedAttachments]);
    event.target.value = "";
  };

  const removeAttachment = (index: number) => {
    setAttachments((current) => {
      const attachment = current[index];
      if (attachment?.previewUrl) URL.revokeObjectURL(attachment.previewUrl);
      return current.filter((_, attachmentIndex) => attachmentIndex !== index);
    });
  };

  const clearAttachments = () => {
    attachments.forEach((attachment) => {
      if (attachment.previewUrl) URL.revokeObjectURL(attachment.previewUrl);
    });
    setAttachments([]);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedContent = content.trim();
    if ((!trimmedContent && !attachments.length) || isSending) return;
    onSend(trimmedContent, attachments.map((attachment) => attachment.file));
    setContent("");
    clearAttachments();
  };

  return (
    <form onSubmit={submit} className="border-t border-slate-100 bg-white p-3">
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachments.map((attachment, index) => (
            <div key={`${attachment.file.name}-${index}`} className="relative flex max-w-full items-center gap-2 rounded-md border border-sky-100 bg-sky-50 py-1.5 pl-1.5 pr-7 text-xs text-sky-900">
              {attachment.previewUrl ? (
                // Local image previews use a temporary browser object URL.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={attachment.previewUrl} alt={attachment.file.name} className="size-10 rounded object-cover" />
              ) : <FileText className="ml-1 size-5 shrink-0 text-[#2674b7]" />}
              <span className="max-w-32 truncate">{attachment.file.name}</span>
              <button type="button" onClick={() => removeAttachment(index)} aria-label={`Remove ${attachment.file.name}`} className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full text-slate-500 transition hover:bg-sky-200 hover:text-slate-800"><X className="size-3" /></button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <input ref={fileInputRef} type="file" multiple onChange={addFiles} className="sr-only" />
        <button type="button" onClick={() => fileInputRef.current?.click()} aria-label="Attach files" className="grid size-9 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-sky-50 hover:text-[#2674b7]"><Paperclip className="size-5" /></button>
        <input value={content} onChange={(event) => setContent(event.target.value)} placeholder="Write your message..." aria-label="Message" className="h-10 min-w-0 flex-1 rounded-md border border-[#2674b7] px-3 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#2674b7]/20" />
        <button type="submit" disabled={isSending || (!content.trim() && !attachments.length)} aria-label="Send message" className="grid size-10 shrink-0 place-items-center rounded-full bg-[#2674b7] text-white transition hover:bg-[#205f96] disabled:cursor-not-allowed disabled:opacity-50"><Send className="size-4" /></button>
      </div>
    </form>
  );
}
