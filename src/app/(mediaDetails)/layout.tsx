import MediaHeader from "@/components/Headers/MediaHeader";

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
