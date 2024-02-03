import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes notes - Films & Séries TV DB",
};

const ProfileNotes = () => {
  return (
    <div>
      <WorkInProgress />
    </div>
  );
};

export default ProfileNotes;
