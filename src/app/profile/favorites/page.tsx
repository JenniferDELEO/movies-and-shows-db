import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes favoris - Films & Séries TV DB",
};

const ProfileFavorites = () => {
  return (
    <div>
      <WorkInProgress />
    </div>
  );
};

export default ProfileFavorites;
