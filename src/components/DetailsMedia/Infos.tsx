"use client";

import { FC, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { FaPlay, FaListUl, FaBookmark } from "react-icons/fa";
import { FaHeart, FaStar } from "react-icons/fa6";
import { Button, Tooltip } from "@nextui-org/react";

import { AccountStates, Genre, Video } from "@/models/movies";
import StarRating from "@/components/StarRate/StarRating";
import YoutubeEmbed from "@/components/YoutubeEmbed/YoutubeEmbed";
import { CreditsMovies, CreditsTvShows } from "@/models/people";
import { languages } from "@/libs/helpers/languages";
import IconsInteraction from "@/components/AccountInteraction/IconsInteraction";
import { getMovieDetail } from "@/libs/api/movies";
import AccountInteraction from "../AccountInteraction/AccountInteraction";
import { UserContext } from "@/context/userContext";
import { List } from "@/models/lists";
import { getLists } from "@/libs/api/lists";
import { getTvShowDetail } from "@/libs/api/tvshows";

type Props = {
  accountStates: AccountStates;
  genresMedia: Genre[];
  id: number;
  originalLanguage: string;
  overview: string;
  tagline: string;
  title: string;
  type: "tvshow" | "movie";
  videos: {
    id: number;
    results: Video[];
  };
  voteAverage: number;
  voteCount: number;

  creditsMovies?: CreditsMovies;
  creditsTvShows?: CreditsTvShows;
  episodeRunTime?: number[];
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  releaseDate?: string;
  runtime?: number;
  status?: string;
};

const Infos: FC<Props> = (props) => {
  const {
    accountStates,
    genresMedia,
    id,
    originalLanguage,
    overview,
    tagline,
    title,
    type,
    videos,
    voteAverage,
    voteCount,

    creditsMovies,
    creditsTvShows,
    episodeRunTime,
    numberOfSeasons,
    numberOfEpisodes,
    releaseDate,
    runtime,
    status,
  } = props;

  const { user } = useContext(UserContext);

  const [openTrailer, setOpenTrailer] = useState(false);

  const [userLists, setUserLists] = useState<List[]>([]);

  const [isFavorite, setIsFavorite] = useState(accountStates.favorite);
  const [isInWatchlist, setIsInWatchlist] = useState(accountStates.watchlist);
  const [isRated, setIsRated] = useState(
    typeof accountStates.rated === "boolean" ? false : true,
  );
  const [userRatingApi, setUserRatingApi] = useState<number>(
    typeof accountStates.rated === "object" ? accountStates.rated.value : 0,
  );

  const trailer = videos?.results?.find((video) => video.type === "Trailer");

  const runtimeHours = runtime ? Math.floor(runtime / 60) : 0;
  const runtimeMinutes = runtime ? runtime % 60 : 0;

  const directors =
    creditsMovies?.crew?.filter((crew) => crew.job === "Director") ||
    creditsTvShows?.crew
      ?.filter((crew) => crew.department === "Directing")
      .slice(0, 3);
  const writers = creditsMovies?.crew
    ?.filter((crew) => crew.job === "Writer")
    .filter((crew) => crew.name !== directors?.[0]?.name);

  const originalLanguageName = languages.find(
    (language) => language.code === originalLanguage,
  )?.name;

  useEffect(() => {
    if (user && user.accountIdV4) {
      getUserList();
    }
  }, [user]);

  async function getUserList() {
    const res = await getLists();
    const listsResponse = res.results;
    listsResponse.unshift({
      id: "1",
      name: "Créer une nouvelle liste",
    });
    setUserLists(listsResponse);
  }

  async function fetchUserAccountStates() {
    if (type === "movie") {
      const response = await getMovieDetail(id.toString());
      setIsFavorite(response.account_states.favorite);
      setIsInWatchlist(response.account_states.watchlist);
      const userRating = response.account_states.rated;
      if (typeof userRating === "object" && userRating?.value) {
        setIsRated(true);
        setUserRatingApi(userRating.value);
      }
      if (typeof userRating === "boolean") setIsRated(userRating);
    }
    if (type === "tvshow") {
      const response = await getTvShowDetail(id.toString());
      setIsFavorite(response.account_states.favorite);
      setIsInWatchlist(response.account_states.watchlist);
      const userRating = response.account_states.rated;
      if (typeof userRating === "object" && userRating?.value) {
        setIsRated(true);
        setUserRatingApi(userRating.value);
      }
      if (typeof userRating === "boolean") setIsRated(userRating);
    }
  }

  return (
    <div className="md:flex md:size-full md:flex-col md:justify-center">
      <div className="fixed bottom-0 left-0 z-10 w-full bg-primary md:hidden">
        <div className="flex flex-row items-center justify-evenly">
          <AccountInteraction
            item={{ id: id, name: title, title: title }}
            type={type}
            user={user}
            fetchUserDatas={fetchUserAccountStates}
            mediaDetailsPageProps={{
              isFavorite,
              isInWatchlist,
              isRated,
              userRatingApi,
            }}
            userLists={userLists}
          />
        </div>
      </div>
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
        <div className="mt-2 hidden text-sm md:block">
          {type === "movie" && (
            <p className="text-gray-400">
              {releaseDate
                ? dayjs(releaseDate).format("DD/MM/YYYY")
                : "Non sortie"}{" "}
              (FR) - {runtimeHours} h {runtimeMinutes} min -{" "}
              {genresMedia &&
                genresMedia.map((genre, index) => {
                  if (index === genresMedia.length - 1) {
                    return <span key={genre.id}>{genre?.name}</span>;
                  }
                  return <span key={genre.id}>{genre?.name}, </span>;
                })}
            </p>
          )}
          {type === "tvshow" && (
            <div className="flex flex-row items-center justify-start">
              <p className="pr-3 text-gray-400">
                <span className="font-bold text-white">Genres : </span>

                {genresMedia &&
                  genresMedia.map((genre, index) => {
                    if (index === genresMedia.length - 1) {
                      return <span key={genre.id}>{genre?.name}</span>;
                    }
                    return <span key={genre.id}>{genre?.name}, </span>;
                  })}
              </p>
              <p className="text-gray-400">
                <span className="font-bold text-white">Statut : </span>
                {status === "Ended" ? (
                  <span className="text-gray-400">Terminée</span>
                ) : status === "Canceled" ? (
                  <span className="text-gray-400">Annulée</span>
                ) : (
                  <span className="text-gray-400">En cours</span>
                )}
              </p>
            </div>
          )}
          <div className="flex flex-row items-center justify-start">
            {originalLanguage && (
              <p className="pr-3 pt-2 text-gray-400">
                <span className="font-bold text-white">Langue : </span>
                {originalLanguageName}
              </p>
            )}
            {episodeRunTime && episodeRunTime?.length > 0 && (
              <div className="flex flex-row items-center justify-start">
                <p className="pr-3 pt-2 font-bold text-white">
                  Durée d&apos;un épisode :{" "}
                  {episodeRunTime.map((runtime, index) => {
                    if (index === episodeRunTime.length - 1) {
                      return (
                        <span
                          key={index}
                          className="pt-2 font-normal text-gray-400"
                        >
                          {runtime} min
                        </span>
                      );
                    }

                    return (
                      <span
                        key={index}
                        className="pt-2 font-normal text-gray-400"
                      >
                        {runtime},{" "}
                      </span>
                    );
                  })}
                </p>
              </div>
            )}
            {numberOfSeasons && (
              <div className="flex flex-row items-center justify-start">
                <p className="pr-3 pt-2 text-gray-400">
                  <span className="font-bold text-white">Saisons : </span>
                  {numberOfSeasons}
                </p>
              </div>
            )}
            {numberOfEpisodes && (
              <div className="flex flex-row items-center justify-start">
                <p className="pr-3 pt-2 text-gray-400">
                  <span className="font-bold text-white">Episodes : </span>
                  {numberOfEpisodes}
                </p>
              </div>
            )}
          </div>
        </div>
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
          <AccountInteraction
            item={{ id: id, name: title, title: title }}
            type={type}
            user={user}
            fetchUserDatas={fetchUserAccountStates}
            mediaDetailsPageProps={{
              isFavorite,
              isInWatchlist,
              isRated,
              userRatingApi,
            }}
            userLists={userLists}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Button variant="light" onClick={() => setOpenTrailer(true)}>
            <FaPlay size={12} className="text-white" />
            Bande annonce
          </Button>
        </div>
      </div>
      <div className="my-4 ml-10 flex flex-col items-center justify-center md:hidden">
        {type === "movie" && (
          <>
            <p className="text-sm text-gray-400">
              {releaseDate
                ? dayjs(releaseDate).format("DD/MM/YYYY")
                : "Non sortie"}{" "}
              (FR) - {runtimeHours} h {runtimeMinutes} min
            </p>
            <p className="text-sm text-gray-400">
              {genresMedia &&
                genresMedia.map((genre, index) => {
                  if (index === genresMedia.length - 1) {
                    return <span key={genre.id}>{genre?.name}</span>;
                  }
                  return <span key={genre.id}>{genre?.name}, </span>;
                })}
            </p>
          </>
        )}
        {type === "tvshow" && (
          <div className="flex flex-col items-center justify-start md:flex-row">
            <p className="pr-2 text-center text-sm">
              <span className="font-bold">Genres : </span>
              {genresMedia &&
                genresMedia.map((genre, index) => {
                  if (index === genresMedia.length - 1) {
                    return (
                      <span key={genre.id} className="text-gray-400">
                        {genre?.name}
                      </span>
                    );
                  }
                  return (
                    <span key={genre.id} className="text-gray-400">
                      {genre?.name},{" "}
                    </span>
                  );
                })}
            </p>
            <p className="pt-2 text-sm">
              <span className="font-bold">Statut : </span>
              {status === "Ended" ? (
                <span className="text-gray-400">Terminée</span>
              ) : status === "Canceled" ? (
                <span className="text-gray-400">Annulée</span>
              ) : (
                <span className="text-gray-400">En cours</span>
              )}
            </p>
          </div>
        )}
        <p className="pt-2 text-sm text-gray-400">
          <span className="font-bold text-white">Langue : </span>
          {originalLanguageName}
        </p>
      </div>
      <div className="m-4 ml-10">
        {tagline && <p className="italic text-gray-400">{tagline}</p>}
        <div className="my-4">
          <h2 className="text-lg font-bold">Synopsis</h2>
          {overview && overview.length > 0 ? (
            <p className="my-4 mr-4 text-sm md:text-justify">{overview}</p>
          ) : (
            <p className="my-4 mr-4 text-sm md:text-justify">Non renseigné</p>
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
