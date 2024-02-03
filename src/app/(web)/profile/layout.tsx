import ProfileHeader from "@/components/Headers/ProfileHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon profil - Films & Séries TV DB",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="size-full overflow-x-hidden pt-[64px]">
      <ProfileHeader />
      <div className="size-full pt-[150px]">{children}</div>
    </div>
  );
}
