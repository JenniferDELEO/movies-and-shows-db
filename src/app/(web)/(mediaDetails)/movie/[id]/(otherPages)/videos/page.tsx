import LoadingSpinner from "@/app/(web)/loading";
import VideosTabs from "@/components/DetailsMedia/Videos/VideosTabs";
import { getVideosMovie } from "@/libs/api/movies";
import { Suspense } from "react";

type Props = {
  params: { id: string };
};

const Videos = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const videos = await getVideosMovie(id);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VideosTabs videos={videos.results} />
    </Suspense>
  );
};

export default Videos;
