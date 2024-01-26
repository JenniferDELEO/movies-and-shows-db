import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes listes - Films & Séries TV DB",
};

const ProfilLists = () => {
  return (
    <div>
      <WorkInProgress />
    </div>
  );
};

export default ProfilLists;
