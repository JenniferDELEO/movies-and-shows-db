import VideosTabs from "@/components/DetailsMedia/Videos/VideosTabs";
import { getVideosTv } from "@/libs/api/tvs";

type Props = {
  params: { id: string };
};

const Videos = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const videos = await getVideosTv(id);

  return <VideosTabs videos={videos.results} />;
};

export default Videos;
