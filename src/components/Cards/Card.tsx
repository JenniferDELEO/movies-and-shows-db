import { getGenresMovies } from "@/libs/api/movies";
import { getGenresTvShows } from "@/libs/api/tvshows";
import dayjs from "dayjs";
import Image from "next/image";
import React, { FC } from "react";
import StarRateAverage from "../StarRate/StarRateAverage";

type Props = {
  item: any;
  filterType: string;
};

const Card: FC<Props> = async ({ item, filterType }) => {
  const { genres: genresTvShows } = await getGenresTvShows();
  const { genres: genresMovies } = await getGenresMovies();

  const overviewRest = item?.overview?.split(" ")?.filter(Boolean);
  const overviewShow = overviewRest?.splice(0, 30)?.join(" ");

  const styleContainer =
    "mb-4 lg:mb-0 flex max-h-[278px] mx-auto lg:mx-4 pr-4 bg-gray-900 rounded-md";

  switch (filterType) {
    case "movie": {
      return (
        <div className={styleContainer}>
          <Image
            src={
              item.poster_path
                ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${item.poster_path}`
                : "/images/defaultImage.png"
            }
            alt={item.title}
            width={0}
            height={0}
            style={{ width: 185, height: 278, borderRadius: 5 }}
            sizes="100vw"
          />
          <div className="ml-4">
            <h3 className="pb-2 text-base md:text-xl">{item.title}</h3>
            <p className="pb-2 text-xs text-gray-400 md:text-sm">
              {item.genre_ids.map((genreId: number) => {
                const genre = genresMovies.find(
                  (genre) => genre.id === genreId,
                );
                return <span key={genreId}>{genre?.name} </span>;
              })}
            </p>
            <div className="flex flex-row items-center pb-2">
              <p className="text-xs text-gray-400 md:text-sm">
                {item.release_date.length
                  ? dayjs(item.release_date).format("DD MMM. YYYY")
                  : ""}
              </p>
              <StarRateAverage
                averageRate={item.vote_average}
                countRate={item.vote_count}
                className={`${item.release_date.length ? "ml-4" : ""}`}
              />
            </div>
            <p className="text-justify text-xs xl:text-sm">
              {overviewShow}
              {overviewRest.length ? "..." : ""}
            </p>
          </div>
        </div>
      );
    }
    case "tv": {
      return (
        <div className={styleContainer}>
          <Image
            src={
              item.poster_path
                ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${item.poster_path}`
                : "/images/defaultImage.png"
            }
            alt={item.name}
            width={0}
            height={0}
            style={{ width: 185, height: 278, borderRadius: 5 }}
            sizes="100vw"
          />
          <div className="ml-4">
            <h3 className="pb-2 text-base md:text-xl">{item.name}</h3>
            <p className="pb-2 text-xs text-gray-400 md:text-sm">
              {item.genre_ids.map((genreId: number) => {
                const genre = genresTvShows.find(
                  (genre) => genre.id === genreId,
                );
                return <span key={genreId}>{genre?.name} </span>;
              })}
            </p>
            <div className="flex flex-row items-center pb-2">
              <p className="text-xs text-gray-400 md:text-sm">
                {dayjs(item?.first_air_date).format("DD MMM. YYYY")}
              </p>
              <StarRateAverage
                averageRate={item.vote_average}
                countRate={item.vote_count}
                className={`${item.first_air_date.length ? "ml-4" : ""}`}
              />
            </div>
            <p>
              {overviewShow}
              {overviewRest.length ? "..." : ""}
            </p>
          </div>
        </div>
      );
    }
    default: {
      return <div>Chargement...</div>;
    }
  }
};

export default Card;
