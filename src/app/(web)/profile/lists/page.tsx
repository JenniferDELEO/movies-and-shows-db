import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes listes - Films & Séries TV DB",
};

const ProfileLists = () => {
  return (
    <div>
      <WorkInProgress />
    </div>
  );
};

export default ProfileLists;
