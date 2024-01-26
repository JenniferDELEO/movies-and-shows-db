import type { Metadata } from "next";

import { getCollection } from "@/libs/api/collections";
import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = Number(params.id.split("-")[0]);

  const collection = await getCollection(id);

  return {
    title: `${collection.name} - Films & Séries TV DB`,
  };
}

const Collection = async ({ params }: Props) => {
  const id = Number(params.id.split("-")[0]);

  const collection = await getCollection(id);

  return (
    <div>
      <WorkInProgress />
    </div>
  );
};

export default Collection;
