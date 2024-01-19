"use client";

import Image from "next/image";
import { FC } from "react";
import Slider from "react-slick";
import dayjs from "dayjs";

import { settings } from "./reactSlickSettings";
import { User } from "@/models/user";
import DropdownCard from "../Dropdown/DropdownCard";
import { List } from "@/models/lists";
import { useRouter } from "next/navigation";

type Props = {
  items: {
    id: number;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
    character?: string;
  }[];
  type: "Films" | "Séries TV";
  user: User;
  fetchUserDatas: () => Promise<void>;
  favoriteMoviesIds: number[];
  favoriteTvShowsIds: number[];
  watchlistMoviesIds: number[];
  watchlistTvShowsIds: number[];
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
  classNames,
  title,
  userLists,
}) => {
  const router = useRouter();

  if (!items) return <div>Chargement...</div>;

  return (
    <div className={classNames.container}>
      <h1 className={classNames.title}>{title}</h1>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className={classNames.items}>
            <div className="relative">
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
                onClick={() =>
                  router.push(
                    `/${type === "Films" ? "movie" : "tvshow"}/${item.id}/${(item?.title || item?.name)?.toLowerCase().replace(/ /g, "-")}`,
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
                  classNames={classNames}
                  userLists={userLists}
                />
              )}
            </div>
            <div className="pl-6 md:pl-4 lg:pl-0">
              <p className="mt-4 font-bold">{item?.title || item?.name}</p>
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
    </div>
  );
};

export default Banner;
