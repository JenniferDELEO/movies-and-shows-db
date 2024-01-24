import { getCollection } from "@/libs/api/collections";

const Collection = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return <div>Chargement...</div>;

  const collection = await getCollection(Number(params.id.split("-")[0]));

  return <div>Collection</div>;
};

export default Collection;
