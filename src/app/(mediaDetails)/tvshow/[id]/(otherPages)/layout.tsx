import OtherPagesHeader from "@/components/Headers/OtherPagesHeader";
import { getTvShowDetail } from "@/libs/api/tvshows";

export default async function TvShowsDetailsLayout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const id = params.id.split("-")[0];

  const tvShowDetail = await getTvShowDetail(id);

  return (
    <div className="size-full overflow-x-hidden pt-[64px]">
      <OtherPagesHeader
        backdropPath={tvShowDetail?.backdrop_path}
        date={tvShowDetail?.first_air_date}
        posterPath={tvShowDetail?.poster_path}
        title={tvShowDetail?.name}
      />
      <div className="size-full">{children}</div>
    </div>
  );
}
