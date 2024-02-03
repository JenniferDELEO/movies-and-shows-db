import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes Séries TV - Films & Séries TV DB",
};

const ProfileTvShows = () => {
  return (
    <div>
      <WorkInProgress />
    </div>
  );
};

export default ProfileTvShows;
