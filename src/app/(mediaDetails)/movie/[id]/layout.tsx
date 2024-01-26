import type { Metadata } from "next";

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

export default function MovieDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="size-full">{children}</div>;
}
