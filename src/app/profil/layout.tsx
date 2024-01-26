import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon profil - Films & Séries TV DB",
};

export default function MovieDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="size-full">{children}</div>;
}
