import type { Metadata } from "next";

import MediaHeader from "@/components/Headers/MediaHeader";
import { getTvShowDetail } from "@/libs/api/tvshows";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id.split("-")[0];

  const tvShowDetail = await getTvShowDetail(id);

  return {
    title: `${tvShowDetail.name} - Films & Séries TV DB`,
  };
}

export default async function TvShowDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const id = params.id.split("-")[0];

  const tvShowDetail = await getTvShowDetail(id);

  return (
    <div className="size-full overflow-x-hidden">
      <MediaHeader
        numberOfBackdrops={tvShowDetail?.images?.backdrops?.length || 0}
        numberOfLogos={tvShowDetail?.images?.logos?.length || 0}
        numberOfPosters={tvShowDetail?.images?.posters?.length || 0}
        numberOfVideos={tvShowDetail?.videos?.results?.length || 0}
      />
      <div className="size-full">{children}</div>
    </div>
  );
}
