import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Création de liste personnalisée - Films & Séries TV DB",
};

const ProfilListCreation = () => {
  return (
    <div>
      <WorkInProgress />
    </div>
  );
};

export default ProfilListCreation;
