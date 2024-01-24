"use client";

import { FC, useState } from "react";
import dayjs from "dayjs";
import { FaPlay } from "react-icons/fa";
import { Button, Tooltip } from "@nextui-org/react";
import { FaListUl, FaBookmark } from "react-icons/fa";
import { FaHeart, FaStar } from "react-icons/fa6";

import { Genre, Video } from "@/models/movies";
import StarRating from "@/components/StarRate/StarRating";
import YoutubeEmbed from "@/components/YoutubeEmbed/YoutubeEmbed";
import { Credits } from "@/models/people";

type Props = {
  genres: Genre[];
  genresMedia?: Genre[];
  title?: string;
  videos?: {
    id: number;
    results: Video[];
  };
  runtime?: number;
  credits?: Credits;
  releaseDate?: string;
  voteAverage?: number;
  voteCount?: number;
  tagline?: string;
  overview?: string;
};

const Infos: FC<Props> = (props) => {
  const {
    genres,
    genresMedia,
    title,
    videos,
    runtime,
    credits,
    releaseDate,
    voteAverage,
    voteCount,
    tagline,
    overview,
  } = props;
  const [openTrailer, setOpenTrailer] = useState(false);

  const trailer = videos?.results?.find((video) => video.type === "Trailer");

  const runtimeHours = runtime ? Math.floor(runtime / 60) : 0;
  const runtimeMinutes = runtime ? runtime % 60 : 0;

  const directors = credits?.crew?.filter((crew) => crew.job === "Director");
  const writers = credits?.crew
    ?.filter((crew) => crew.job === "Writer")
    .filter((crew) => crew.name !== directors?.[0]?.name);

  return (
    <div className="md:flex md:size-full md:flex-col md:justify-center">
      {openTrailer && trailer && (
        <YoutubeEmbed embedId={trailer.key} setOpenTrailer={setOpenTrailer} />
      )}
      <div className="my-4 text-center md:ml-10 md:text-start">
        <h1 className="text-xl font-bold md:text-3xl">
          {title}
          <span className="text-base font-normal text-gray-400 md:text-2xl">
            {" "}
            {releaseDate
              ? `(${dayjs(releaseDate).format("YYYY")})`
              : "(Non sortie)"}
          </span>
        </h1>
        <p className="mt-2 hidden text-sm md:block">
          {releaseDate ? dayjs(releaseDate).format("DD/MM/YYYY") : "Non sortie"}{" "}
          (FR) - {runtimeHours} h {runtimeMinutes} min -{" "}
          {genresMedia &&
            genresMedia.map((g) => {
              const genre = genres.find((genre) => genre.id === g.id);
              return <span key={g.id}>{genre?.name} </span>;
            })}
        </p>
      </div>
      <div className="m-4 ml-10 flex flex-row items-center justify-evenly md:justify-start">
        <div className="flex flex-col items-center justify-center md:mr-4 md:items-start">
          <p className="font-bold">Note moyenne</p>
          <StarRating
            count={5}
            value={voteAverage ? voteAverage / 2 : 0}
            size={20}
          />
          <p className="mt-1 text-xs text-gray-400">
            ({voteCount} vote
            {voteCount && voteCount > 1 ? "s" : ""})
          </p>
        </div>
        <div className="hidden flex-row items-center justify-evenly md:mx-10 md:flex">
          <Tooltip content="Ajouter à une liste" placement="bottom">
            <button className="mr-1 rounded-full bg-primary p-3 lg:mr-3">
              <FaListUl size={16} />
            </button>
          </Tooltip>
          <Tooltip content="Marquer comme favoris" placement="bottom">
            <button className="mr-1 rounded-full bg-primary p-3 lg:mr-3">
              <FaHeart size={16} />
            </button>
          </Tooltip>
          <Tooltip content="Ajouter à la liste de suivi" placement="bottom">
            <button className="mr-1 rounded-full bg-primary p-3 lg:mr-3">
              <FaBookmark size={16} />
            </button>
          </Tooltip>
          <Tooltip content="Donner une note" placement="bottom">
            <button className="rounded-full bg-primary p-3">
              <FaStar size={16} />
            </button>
          </Tooltip>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Button variant="light" onClick={() => setOpenTrailer(true)}>
            <FaPlay size={12} className="text-white" />
            Bande annonce
          </Button>
        </div>
      </div>
      <div className="my-4 ml-10 flex flex-col items-center justify-center md:hidden">
        <p className="text-sm">
          {releaseDate ? dayjs(releaseDate).format("DD/MM/YYYY") : "Non sortie"}{" "}
          (FR) - {runtimeHours} h {runtimeMinutes} min
        </p>
        <p>
          {genresMedia &&
            genresMedia.map((g) => {
              const genre = genres.find((genre) => genre.id === g.id);
              return <span key={g.id}>{genre?.name} </span>;
            })}
        </p>
      </div>
      <div className="m-4 ml-10">
        {tagline && <p className="italic text-gray-400">{tagline}</p>}
        <div className="my-4">
          <h2 className="text-lg font-bold">Synopsis</h2>
          {overview && (
            <p className="my-4 mr-4 text-sm md:text-justify">{overview}</p>
          )}
        </div>
      </div>
      <div className="m-4 ml-10 mr-6 flex flex-row flex-wrap items-center justify-between">
        {directors?.map((director) => (
          <div key={director.id} className="m-2">
            <h2 className="font-bold">Direction</h2>
            <p className="text-sm">{director.name}</p>
          </div>
        ))}
        {writers?.map((writer) => (
          <div key={writer.id} className="m-2">
            <h2 className="font-bold">Réalisation</h2>
            <p className="text-sm">{writer.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Infos;
