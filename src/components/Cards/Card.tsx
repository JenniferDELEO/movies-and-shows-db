"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { FC } from "react";
import { useRouter } from "next/navigation";
import "dayjs/locale/fr";
import updateLocale from "dayjs/plugin/updateLocale";

import StarRating from "@/components/StarRate/StarRating";
import { TvShow } from "@/models/tvShows";
import { Movie } from "@/models/movies";

dayjs.locale("fr");

dayjs.extend(updateLocale);

dayjs.updateLocale("fr", {
  monthsShort: [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Aout",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
});

type Props = {
  filterType: string;
  genres: {
    id: number;
    name: string;
  }[];
  movie?: Movie;
  tvShow?: TvShow;
};

const Card: FC<Props> = ({ filterType, genres, movie, tvShow }) => {
  const router = useRouter();

  const overviewRest =
    movie?.overview?.split(" ")?.filter(Boolean) ||
    tvShow?.overview?.split(" ")?.filter(Boolean);
  const overviewShow = overviewRest?.splice(0, 30)?.join(" ");

  const title = movie?.title || tvShow?.name || "";
  const date = movie?.release_date || tvShow?.first_air_date;
  const voteAverage = movie?.vote_average || tvShow?.vote_average || 0;
  const voteCount = movie?.vote_count || tvShow?.vote_count || 0;

  const styleContainer =
    "mb-4 2xl:mb-0 flex max-h-[278px] mx-auto lg:mx-4 pr-4 bg-gray-900 rounded-md cursor-pointer";

  return (
    <div
      className={styleContainer}
      onClick={() =>
        router.push(
          `/${filterType === "movie" ? "movie" : "tvshow"}/${movie?.id || tvShow?.id}-${title?.toLowerCase().replace(/[\W_]+/g, "-")}`,
        )
      }
    >
      <Image
        src={
          movie?.poster_path
            ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${movie.poster_path}`
            : tvShow?.poster_path
              ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${tvShow.poster_path}`
              : "/images/defaultImage.png"
        }
        alt={title ? title : "defaultImage"}
        width={0}
        height={0}
        sizes="100vw"
        className="my-auto h-[255px] min-h-[255px] w-[170px] min-w-[170px] rounded-md md:h-[278px] md:w-[185px]"
      />
      <div className="ml-2 md:ml-4">
        <h3 className="py-1 text-sm md:pt-4 md:text-xl">{title}</h3>
        {movie && (
          <p className="text-xs text-gray-400 md:text-sm">
            {movie?.genre_ids.map((genreId, index) => {
              const genre = genres.find((genre) => genre.id === genreId);
              if (index === movie.genre_ids.length - 1) {
                return <span key={genreId}>{genre?.name}</span>;
              }
              return <span key={genreId}>{genre?.name}, </span>;
            })}
          </p>
        )}
        {tvShow && (
          <p className="text-xs text-gray-400 md:text-sm">
            {tvShow?.genre_ids.map((genreId, index) => {
              const genre = genres.find((genre) => genre.id === genreId);
              if (index === tvShow.genre_ids.length - 1) {
                return <span key={genreId}>{genre?.name}</span>;
              }
              return <span key={genreId}>{genre?.name}, </span>;
            })}
          </p>
        )}
        <div className="flex flex-row items-center justify-start pb-2">
          <p className="text-xs text-gray-400 md:text-sm">
            {date?.length ? dayjs(date).format("DD MMM. YYYY") : ""}
          </p>
          <div className={`flex items-center justify-between `}>
            <StarRating
              value={voteAverage / 2}
              count={5}
              size={14}
              isHalf={true}
              edit={false}
            />
            <span className="ml-1 text-xs text-gray-500">
              ({voteCount} vote{voteCount > 1 ? "s" : ""})
            </span>
          </div>
        </div>
        <p className="text-xs md:text-justify md:text-sm">
          {overviewShow}
          {overviewRest?.length ? "..." : ""}
        </p>
      </div>
    </div>
  );
};

export default Card;
