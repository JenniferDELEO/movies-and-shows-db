import VideosContent from "@/components/DetailsMedia/Videos/VideosContent";
import { getVideosMovie } from "@/libs/api/movies";

type Props = {
  params: { id: string };
};

const Videos = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const videos = await getVideosMovie(id);

  return <VideosContent videos={videos.results} />;
};

export default Videos;
