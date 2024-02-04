import type { Metadata } from "next";
import { ReactNode } from "react";

import MediaHeader from "@/components/Headers/MediaHeader";
import { getTvShowDetail } from "@/libs/api/tvshows";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id.split("-")[0];

  const tvShowDetails = await getTvShowDetail(id);

  return {
    title: `${tvShowDetails.name} - Films & Séries TV DB`,
  };
}

export default async function TvShowDetailsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  const id = params.id.split("-")[0];

  const tvShowDetails = await getTvShowDetail(id);

  return (
    <div className="size-full overflow-x-hidden">
      <MediaHeader
        numberOfBackdrops={tvShowDetails?.images?.backdrops?.length || 0}
        numberOfLogos={tvShowDetails?.images?.logos?.length || 0}
        numberOfPosters={tvShowDetails?.images?.posters?.length || 0}
        numberOfVideos={tvShowDetails?.videos?.results?.length || 0}
      />
      <div className="size-full">{children}</div>
    </div>
  );
}
