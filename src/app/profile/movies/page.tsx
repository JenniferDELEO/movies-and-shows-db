import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes films - Films & Séries TV DB",
};

const ProfileMovies = () => {
  return (
    <div>
      <WorkInProgress />
    </div>
  );
};

export default ProfileMovies;
