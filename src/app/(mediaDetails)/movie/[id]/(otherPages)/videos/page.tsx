import VideosTabs from "@/components/DetailsMedia/Videos/VideosTabs";
import { getVideosMovie } from "@/libs/api/movies";

type Props = {
  params: { id: string };
};

const Videos = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const videos = await getVideosMovie(id);

  return <VideosTabs videos={videos.results} />;
};

export default Videos;
