"use client";

import dayjs from "dayjs";
import { FC } from "react";
import { useRouter } from "next/navigation";
import "dayjs/locale/fr";
import updateLocale from "dayjs/plugin/updateLocale";

import StarRating from "@/components/StarRate/StarRating";
import { Tv } from "@/models/tvs";
import { Genre, Movie } from "@/models/movies";

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
    "Dec"
  ]
});

type Props = {
  filterType: string;
  genres: Genre[];
  movie?: Movie;
  tv?: Tv;
  classNames?: {
    container: string;
    title: string;
    items: string;
    image: string;
    dropdownContainer: string;
  };
};

const Card: FC<Props> = (
  {
    filterType,
    genres,
    movie,
    tv,
    classNames
  }) => {
  const router = useRouter();

  const overviewRest =
    movie?.overview?.split(" ")?.filter(Boolean) ||
    tv?.overview?.split(" ")?.filter(Boolean);
  const overviewShow = overviewRest?.splice(0, 30)?.join(" ");

  const title = movie?.title || tv?.name || "";
  const date = movie?.release_date || tv?.first_air_date;
  const voteAverage = movie?.vote_average || tv?.vote_average || 0;
  const voteCount = movie?.vote_count || tv?.vote_count || 0;

  const styleContainer =
    "mb-4 2xl:mb-0 flex max-h-[278px] mx-auto lg:mx-4 pr-4 bg-gray-900 rounded-md cursor-pointer";

  return (
    <div
      className={styleContainer}
      onClick={() =>
        router.push(
          `/${filterType === "movie" ? "movie" : "tv"}/${movie?.id || tv?.id}-${title?.toLowerCase().replace(/[\W_]+/g, "-")}`
        )
      }
    >
      <picture>
        <img
          src={
            movie?.poster_path
              ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${movie.poster_path}`
              : tv?.poster_path
                ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${tv.poster_path}`
                : "/images/defaultImage.png"
          }
          alt={title ? title : "defaultImage"}
          width={0}
          height={0}
          sizes="100vw"
          className="my-auto h-[255px] min-h-[255px] w-[170px] min-w-[170px] rounded-md md:h-[278px] md:w-[185px]"
        />
      </picture>

      <div className="relative ml-2 w-full md:ml-4">
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
        {tv && (
          <p className="text-xs text-gray-400 md:text-sm">
            {tv?.genre_ids.map((genreId, index) => {
              const genre = genres.find((genre) => genre.id === genreId);
              if (index === tv.genre_ids.length - 1) {
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
