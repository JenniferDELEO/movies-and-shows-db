"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import Slider from "react-slick";
import dayjs from "dayjs";

import { settings } from "@/components/Banner/reactSlickSettings";
import { User } from "@/models/user";
import DropdownCard from "@/components/Dropdown/DropdownCard";
import { List } from "@/models/lists";
import { Movie } from "@/models/movies";
import { TvShow } from "@/models/tvShows";

type Props = {
  items: {
    id: number;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
    original_name?: string;
    character?: string;
  }[];
  type: "Films" | "Séries TV";
  user: User;
  fetchUserDatas: () => Promise<void>;
  favoriteMoviesIds: number[];
  favoriteTvShowsIds: number[];
  watchlistMoviesIds: number[];
  watchlistTvShowsIds: number[];
  ratedMovies: Movie[];
  ratedTvShows: TvShow[];
  ratedMoviesIds: number[];
  ratedTvShowsIds: number[];
  classNames: {
    container: string;
    title: string;
    items: string;
    image: string;
    dropdownContainer: string;
  };
  title: string;
  userLists: List[];
};

const Banner: FC<Props> = ({
  items,
  type,
  user,
  fetchUserDatas,
  favoriteMoviesIds,
  favoriteTvShowsIds,
  watchlistMoviesIds,
  watchlistTvShowsIds,
  ratedMoviesIds,
  ratedTvShowsIds,
  classNames,
  title,
  userLists,
  ratedMovies,
  ratedTvShows,
}) => {
  const router = useRouter();

  if (!items) return <div>Chargement...</div>;

  return (
    <section className={classNames.container}>
      <h1 className={classNames.title}>{title}</h1>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className={classNames.items}>
            <div className="relative m-auto h-[250px] min-h-[250px] w-[145px] min-w-[145px] overflow-hidden rounded-sm sm:h-[300px] sm:w-[200px] 2xl:h-[400px] 2xl:w-[250px]">
              <Image
                src={
                  item.poster_path
                    ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w342${item.poster_path}`
                    : "/images/defaultImage.png"
                }
                alt={`${item?.title || item?.name} poster`}
                width={0}
                height={0}
                className={`${classNames.image} cursor-pointer`}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  minWidth: "100%",
                  minHeight: "100%",
                  borderWidth: 0,
                  outline: 0,
                }}
                onClick={() =>
                  router.push(
                    `/${type === "Films" ? "movie" : "tvshow"}/${item.id}-${(item?.title || item?.name)?.toLowerCase().replace(/[\W_]+/g, "-")}`,
                  )
                }
              />
              {user && user.username && (
                <DropdownCard
                  item={item}
                  type={type}
                  user={user}
                  fetchUserDatas={fetchUserDatas}
                  favoriteMoviesIds={favoriteMoviesIds}
                  favoriteTvShowsIds={favoriteTvShowsIds}
                  watchlistMoviesIds={watchlistMoviesIds}
                  watchlistTvShowsIds={watchlistTvShowsIds}
                  ratedMoviesIds={ratedMoviesIds}
                  ratedTvShowsIds={ratedTvShowsIds}
                  ratedMovies={ratedMovies}
                  ratedTvShows={ratedTvShows}
                  classNames={classNames}
                  userLists={userLists}
                />
              )}
            </div>
            <div className="flex flex-col items-center justify-center pb-4 text-sm md:text-base">
              <p className="mt-4 text-wrap text-center font-bold">
                {item?.title || item?.name}
              </p>
              <p className="mt-2 text-gray-400">
                {item?.release_date
                  ? dayjs(item.release_date).format("DD MMM. YYYY")
                  : item?.first_air_date
                    ? dayjs(item.first_air_date).format("DD MMM. YYYY")
                    : "Non renseignée"}
              </p>
              {item?.character && (
                <>
                  <p className="mt-2 text-gray-400">Dans le rôle de :</p>
                  <p className="mt-2 text-gray-400">{item.character}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;
