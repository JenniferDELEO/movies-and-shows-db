import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import type { Metadata } from "next";
import { Suspense } from "react";
import LoadingSpinner from "../../loading";

export const metadata: Metadata = {
  title: "Mes notes - Films & Séries TV DB",
};

const ProfileNotes = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <WorkInProgress />
      </Suspense>
    </div>
  );
};

export default ProfileNotes;
