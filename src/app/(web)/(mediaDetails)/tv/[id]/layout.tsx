import type { Metadata } from "next";
import { ReactNode } from "react";

import MediaHeader from "@/components/Headers/MediaHeader";
import { getTvDetail } from "@/libs/api/tvs";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id.split("-")[0];

  const tvDetails = await getTvDetail(id);

  return {
    title: `${tvDetails.name} - Films & Séries TV DB`,
  };
}

export default async function TvDetailsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  const id = params.id.split("-")[0];

  const tvDetails = await getTvDetail(id);

  return (
    <div className="size-full overflow-x-hidden">
      <MediaHeader
        numberOfBackdrops={tvDetails?.images?.backdrops?.length || 0}
        numberOfLogos={tvDetails?.images?.logos?.length || 0}
        numberOfPosters={tvDetails?.images?.posters?.length || 0}
        numberOfVideos={tvDetails?.videos?.results?.length || 0}
      />
      <div className="size-full">{children}</div>
    </div>
  );
}
