import type { Metadata } from "next";
import { ReactNode } from "react";

import MediaHeader from "@/components/Headers/MediaHeader";
import { getMovieDetail } from "@/libs/api/movies";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id.split("-")[0];

  const movieDetail = await getMovieDetail(id);

  return {
    title: `${movieDetail.title} - Films & Séries TV DB`,
  };
}

export default async function MovieDetailsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  const id = params.id.split("-")[0];

  const movieDetail = await getMovieDetail(id);

  return (
    <div className="size-full overflow-x-hidden">
      <MediaHeader
        numberOfBackdrops={movieDetail?.images?.backdrops?.length || 0}
        numberOfLogos={movieDetail?.images?.logos?.length || 0}
        numberOfPosters={movieDetail?.images?.posters?.length || 0}
        numberOfVideos={movieDetail?.videos?.results?.length || 0}
      />
      <div className="size-full">{children}</div>
    </div>
  );
}
