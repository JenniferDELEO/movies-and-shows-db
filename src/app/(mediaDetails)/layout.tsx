import MediaHeader from "@/components/Header/MediaHeader";

export default function MediaDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="size-full overflow-x-hidden">
      <MediaHeader />
      <div className="size-full">{children}</div>
    </div>
  );
}
