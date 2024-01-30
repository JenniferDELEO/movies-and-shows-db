import VideosTabs from "@/components/DetailsMedia/Videos/VideosTabs";
import { getVideosTvShow } from "@/libs/api/tvshows";

type Props = {
  params: { id: string };
};

const Videos = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const videos = await getVideosTvShow(id);

  return <VideosTabs videos={videos.results} />;
};

export default Videos;
