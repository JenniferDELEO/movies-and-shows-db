import dayjs from "dayjs";
import React, { FC } from "react";

import { Person } from "@/models/people";

type Props = {
  data: Person;
};

const LeftContent: FC<Props> = ({ data }) => {
  const startDay = dayjs(data?.birthday);
  const endDay = data?.deathday ? dayjs(data.deathday) : dayjs();
  const age = endDay.diff(startDay, "year");

  return (
    <div className="mt-4 flex flex-col items-center justify-center border-b py-4 md:w-[45%] md:items-start md:border-none lg:w-[35%] xl:w-[30%]">
      <div className="hidden size-full md:block">
        <picture>
          <img
            src={
              data?.profile_path
                ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w300${data.profile_path}`
                : "/images/defaultImage.png"
            }
            width={300}
            height={450}
            alt={data.name}
            className="mb-4 rounded-lg"
          />
        </picture>
      </div>
      <div className="flex size-full flex-row items-center justify-center md:hidden">
        <picture>
          <img
            src={
              data?.profile_path
                ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w300${data.profile_path}`
                : "/images/defaultImage.png"
            }
            width={100}
            height={150}
            alt={data.name}
            className="mb-4 rounded-lg"
          />
        </picture>
      </div>
      <h1 className="mt-4 text-2xl font-bold md:hidden lg:text-3xl">
        {data.name}
      </h1>
      <h2 className="mt-4 text-lg font-bold lg:text-xl">
        Informations personnelles
      </h2>
      <div className="my-4 grid grid-cols-2 md:grid-cols-1">
        <div>
          <h3 className="mt-4 text-base font-bold lg:text-lg">
            Date de Naissance
          </h3>
          {data?.birthday ? (
            <p className="text-base text-gray-400 lg:text-lg">
              {dayjs(data.birthday).format("DD/MM/YYYY")} ({age} ans)
            </p>
          ) : (
            <p className="text-base text-gray-400 lg:text-lg">Non renseignée</p>
          )}
        </div>

        {data?.deathday && (
          <div>
            <h3 className="mt-4 text-base font-bold lg:text-lg">
              Date de Décès
            </h3>
            <p className="text-base text-gray-400 lg:text-lg">
              {dayjs(data.deathday).format("DD/MM/YYYY")}
            </p>
          </div>
        )}

        <div>
          <h3 className="mt-4 w-fit text-base font-bold lg:text-lg">
            Lieu de Naissance
          </h3>
          {data?.place_of_birth ? (
            <p className="text-base text-gray-400 lg:text-lg">
              {data.place_of_birth}
            </p>
          ) : (
            <p className="text-base text-gray-400 lg:text-lg">Non renseigné</p>
          )}
        </div>

        {data?.movie_credits?.cast && (
          <div>
            <h3 className="mt-4 text-base font-bold lg:text-lg">
              Films (Act.)
            </h3>
            <p className="text-base text-gray-400 lg:text-lg">
              {data.movie_credits.cast.length}
            </p>
          </div>
        )}
        {data?.movie_credits?.crew && (
          <div>
            <h3 className="mt-4 text-base font-bold lg:text-lg">
              Films (Réal.)
            </h3>
            <p className="text-base text-gray-400 lg:text-lg">
              {data.movie_credits.crew.length}
            </p>
          </div>
        )}
        {data?.tv_credits?.cast && (
          <div>
            <h3 className="mt-4 text-base font-bold lg:text-lg">
              Séries TV (Act.)
            </h3>
            <p className="text-base text-gray-400 lg:text-lg">
              {data.tv_credits.cast.length}
            </p>
          </div>
        )}
        {data?.tv_credits?.crew && (
          <div>
            <h3 className="mt-4 text-base font-bold lg:text-lg">
              Séries TV (Réal.)
            </h3>
            <p className="text-base text-gray-400 lg:text-lg">
              {data.tv_credits.crew.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftContent;
