import OtherPagesHeader from "@/components/Headers/OtherPagesHeader";
import { getMovieDetail } from "@/libs/api/movies";

export default async function MovieDetailsLayout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const id = params.id.split("-")[0];

  const movieDetail = await getMovieDetail(id);

  return (
    <div className="size-full overflow-x-hidden pt-[64px]">
      <OtherPagesHeader
        backdropPath={movieDetail?.backdrop_path}
        date={movieDetail?.release_date}
        posterPath={movieDetail?.poster_path}
        title={movieDetail?.title}
      />
      <div className="size-full pt-[150px]">{children}</div>
    </div>
  );
}
