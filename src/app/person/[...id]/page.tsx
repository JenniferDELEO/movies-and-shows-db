import BannerWrapper from "@/components/Banner/BannerWrapper";
import Infos from "@/components/People/PeopleDetails/Infos";
import { getPeopleDetail } from "@/libs/api/people";
import { Movie } from "@/models/movies";
import { TvShow } from "@/models/tvShows";

const Person = async ({ params }: { params: { id: string[] } }) => {
  if (!params.id) return <div>Chargement...</div>;

  const data = await getPeopleDetail(params.id[0]);

  const actingMovies: Movie[] = data?.movie_credits?.cast;
  const runningMovies: Movie[] = data?.movie_credits?.crew;
  const actingTvShows: TvShow[] = data?.tv_credits?.cast;
  const runningTvShows: TvShow[] = data?.tv_credits?.crew;

  return (
    <div>
      <Infos data={data} />
      <BannerWrapper
        personDetailProps={{
          actingMovies,
          runningMovies,
          actingTvShows,
          runningTvShows,
        }}
      />
    </div>
  );
};

export default Person;
