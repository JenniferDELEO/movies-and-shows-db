import LoadingSpinner from "@/app/(web)/loading";
import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Création de liste personnalisée - Films & Séries TV DB",
};

const ProfilListCreation = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <WorkInProgress />
      </Suspense>
    </div>
  );
};

export default ProfilListCreation;
