import MediaHeader from "@/components/Header/MediaHeader";

export default function MediaDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MediaHeader />
      <div className="size-full">{children}</div>
    </div>
  );
}
