"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import Slider from "react-slick";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import updateLocale from "dayjs/plugin/updateLocale";

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

import {
  settingsMinTwoSlides,
  settingsMinThreeSlides,
  settingsMinFourSlides,
  settingsMinFiveSlides,
} from "@/components/Banner/reactSlickSettings";
import { User } from "@/models/user";
import { List } from "@/models/lists";
import { InternalMovie, InternalMovieUser, Movie } from "@/models/movies";
import { InternalTv, InternalTvAndUser, Tv } from "@/models/tvs";
import AccountInteraction from "../AccountInteraction/AccountInteraction";
import { useSession } from "next-auth/react";

type Props = {
  items: {
    id: number;
    poster_path: string;
    genre_ids: number[];
    overview: string;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
    original_name?: string;
    character?: string;
  }[];
  type: "tv" | "movie";
  user: User;
  fetchUserDatas: () => Promise<void>;
  favoriteMoviesIds: number[];
  favoriteTvsIds: number[];
  watchlistMoviesIds: number[];
  watchlistTvsIds: number[];
  ratedMovies: Movie[];
  ratedTvs: Tv[];
  ratedMoviesIds: number[];
  ratedTvsIds: number[];
  classNames: {
    container: string;
    title: string;
    items: string;
    image: string;
    dropdownContainer: string;
  };
  title: string;
  userLists: List[];
  internalMovies?: InternalMovie[];
  userMovies?: InternalMovieUser[];
  userMoviesId?: string;
  internalTvs?: InternalTv[];
  userTvs?: InternalTvAndUser[];
};

const Banner: FC<Props> = ({
  items,
  type,
  user,
  fetchUserDatas,
  favoriteMoviesIds,
  favoriteTvsIds,
  watchlistMoviesIds,
  watchlistTvsIds,
  ratedMoviesIds,
  ratedTvsIds,
  classNames,
  title,
  userLists,
  ratedMovies,
  ratedTvs,
  internalMovies,
  userMovies,
  userMoviesId,
  internalTvs,
  userTvs,
}) => {
  const router = useRouter();
  const { status } = useSession();
  const settings =
    items.length > 4
      ? settingsMinFiveSlides
      : items.length > 3
        ? settingsMinFourSlides
        : items.length > 2
          ? settingsMinThreeSlides
          : settingsMinTwoSlides;

  return (
    <section className={classNames.container}>
      <h1 className={classNames.title}>{title}</h1>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className={classNames.items}>
            <div className="relative m-auto h-[250px] min-h-[250px] w-[145px] min-w-[145px] overflow-hidden rounded-sm sm:h-[300px] sm:w-[200px] 2xl:h-[400px] 2xl:w-[250px]">
              <picture>
                <img
                  src={
                    item?.poster_path
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
                      `/${type}/${item.id}-${(item?.title || item?.name)?.toLowerCase().replace(/[\W_]+/g, "-")}`,
                    )
                  }
                />
              </picture>

              {user && user.tmdb_username && status === "authenticated" && (
                <AccountInteraction
                  item={item}
                  type={type}
                  user={user}
                  fetchUserDatas={fetchUserDatas}
                  listsPageProps={{
                    favoriteMoviesIds,
                    favoriteTvsIds,
                    watchlistMoviesIds,
                    watchlistTvsIds,
                    ratedMovies,
                    ratedTvs,
                    ratedMoviesIds,
                    ratedTvsIds,
                    classNames,
                    internalMovies: internalMovies || [],
                    userMovies: userMovies || [],
                    userMoviesId: userMoviesId || "",
                    internalTvs: internalTvs || [],
                    userTvs: userTvs || [],
                  }}
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
