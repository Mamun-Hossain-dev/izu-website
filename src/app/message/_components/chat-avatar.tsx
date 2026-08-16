type ChatAvatarProps = {
  name: string;
  imageUrl?: string;
  className?: string;
};

export function ChatAvatar({ name, imageUrl, className = "size-10" }: ChatAvatarProps) {
  if (imageUrl) {
    return (
      // API image URLs can be hosted by different providers.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={imageUrl} alt={`${name}'s avatar`} className={`${className} shrink-0 rounded-full object-cover`} />
    );
  }

  return (
    <span className={`${className} grid shrink-0 place-items-center rounded-full bg-[#2674b7] text-sm font-semibold text-white`} aria-label={`${name}'s avatar`}>
      {name.trim().slice(0, 1).toUpperCase() || "?"}
    </span>
  );
}
