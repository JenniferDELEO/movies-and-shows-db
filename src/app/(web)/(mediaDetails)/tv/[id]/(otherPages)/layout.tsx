import { ReactNode } from "react";

import OtherPagesHeader from "@/components/Headers/OtherPagesHeader";
import { getTvDetail } from "@/libs/api/tvs";

export default async function TvsDetailsLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const id = params.id.split("-")[0];

  const tvDetails = await getTvDetail(id);

  return (
    <div className="size-full overflow-x-hidden pt-[64px]">
      <OtherPagesHeader
        backdropPath={tvDetails?.backdrop_path}
        date={tvDetails?.first_air_date}
        posterPath={tvDetails?.poster_path}
        title={tvDetails?.name}
      />
      <div className="size-full">{children}</div>
    </div>
  );
}
