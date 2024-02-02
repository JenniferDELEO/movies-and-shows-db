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

  const tvShowDetails = await getTvShowDetail(id);

  return (
    <div className="size-full overflow-x-hidden pt-[64px]">
      <OtherPagesHeader
        backdropPath={tvShowDetails?.backdrop_path}
        date={tvShowDetails?.first_air_date}
        posterPath={tvShowDetails?.poster_path}
        title={tvShowDetails?.name}
      />
      <div className="size-full">{children}</div>
    </div>
  );
}
