"use client";

import { FC, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button } from "@nextui-org/react";
import { FaPlay } from "react-icons/fa";

import {
  Genre,
  InternalMovie,
  InternalMovieUser,
  MovieDetails,
} from "@/models/movies";
import StarRating from "@/components/StarRate/StarRating";
import YoutubeEmbed from "@/components/YoutubeEmbed/YoutubeEmbed";
import { languages } from "@/libs/helpers/languages";
import { getMovieDetail } from "@/libs/api/movies";
import AccountInteraction from "@/components/AccountInteraction/AccountInteraction";
import { UserContext } from "@/context/userContext";
import { List } from "@/models/lists";
import { getLists } from "@/libs/api/lists";
import { getTvShowDetail } from "@/libs/api/tvshows";
import { Episode, EpisodeDetails, TvShowDetails } from "@/models/tvShows";
import { Collection } from "@/models/collections";

type Props = {
  movieDetails?: MovieDetails;
  tvShowDetails?: TvShowDetails;
  episodeDetails?: EpisodeDetails;
  collectionDetails?: Collection;
  genresCollection?: Genre[];
  voteAverageCollection?: number;
  type: "episode" | "movie" | "tvshow";
  episodePrecedent?: Episode | undefined;
  episodeNumber?: number;
  isCollection?: boolean;
  seasonNumber?: number;
  tvShowId?: number;
  userMovies?: InternalMovieUser[];
  userMoviesId?: string;
  internalMovies?: InternalMovie[];
};

const Infos: FC<Props> = (props) => {
  const {
    movieDetails,
    tvShowDetails,
    episodeDetails,
    collectionDetails,
    genresCollection,
    voteAverageCollection,
    type,
    episodeNumber,
    episodePrecedent,
    isCollection,
    seasonNumber,
    tvShowId,
    userMovies,
    userMoviesId,
    internalMovies,
  } = props;

  const { user } = useContext(UserContext);

  const [openTrailer, setOpenTrailer] = useState(false);

  const [userLists, setUserLists] = useState<List[]>([]);

  const [isFavorite, setIsFavorite] = useState(
    movieDetails?.account_states?.favorite ||
      (type === "tvshow" && tvShowDetails?.account_states?.favorite),
  );
  const [isInWatchlist, setIsInWatchlist] = useState(
    movieDetails?.account_states?.watchlist ||
      (type === "tvshow" && tvShowDetails?.account_states?.watchlist),
  );
  const [isRated, setIsRated] = useState(
    typeof movieDetails?.account_states?.rated === "object" ||
      (typeof tvShowDetails?.account_states?.rated === "object" &&
        type === "tvshow") ||
      typeof episodeDetails?.account_states?.rated === "object"
      ? true
      : false,
  );
  const [userRatingApi, setUserRatingApi] = useState<number>(
    typeof movieDetails?.account_states?.rated === "object"
      ? movieDetails?.account_states.rated.value
      : type === "tvshow" &&
          typeof tvShowDetails?.account_states?.rated === "object"
        ? tvShowDetails?.account_states.rated.value
        : typeof episodeDetails?.account_states?.rated === "object"
          ? episodeDetails.account_states.rated.value
          : 0,
  );

  const trailer =
    movieDetails?.videos?.results?.find((video) => video.type === "Trailer") ||
    (type === "tvshow" &&
      tvShowDetails?.videos?.results?.find(
        (video) => video.type === "Trailer",
      ));

  const runtimeHours = movieDetails?.runtime
    ? Math.floor(movieDetails.runtime / 60)
    : 0;
  const runtimeMinutes = movieDetails?.runtime ? movieDetails.runtime % 60 : 0;

  const directors =
    movieDetails?.credits?.crew?.filter((crew) => crew.job === "Director") ||
    (type === "tvshow" && tvShowDetails?.aggregate_credits?.crew)
      ? tvShowDetails?.aggregate_credits?.crew
          ?.filter((crew) => crew.department === "Directing")
          .slice(0, 3)
      : episodeDetails?.crew
        ? episodeDetails.crew?.filter((crew) => crew.department === "Directing")
        : [];
  const writers = movieDetails?.credits?.crew
    ?.filter((crew) => crew.job === "Writer")
    .filter((crew) => crew.name !== directors?.[0]?.name);

  const originalLanguageName =
    languages.find(
      (language) => language.code === movieDetails?.original_language,
    )?.name ||
    languages.find(
      (language) => language.code === tvShowDetails?.original_language,
    )?.name;

  const watchProvidersFr =
    movieDetails?.watch_providers_fr ||
    (type === "tvshow" && tvShowDetails?.watch_providers_fr);

  const releaseDate =
    movieDetails?.release_date ||
    episodeDetails?.air_date ||
    tvShowDetails?.first_air_date;

  const genres =
    movieDetails?.genres || tvShowDetails?.genres || genresCollection;

  const overview =
    (type === "movie" && movieDetails?.overview) ||
    (type === "episode" && episodeDetails?.overview) ||
    (type === "tvshow" && tvShowDetails?.overview) ||
    (isCollection && collectionDetails?.overview);
  ("");

  useEffect(() => {
    if (user && user.tmdb_accountIdV4) {
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
    if (type === "movie" && movieDetails) {
      const response = await getMovieDetail(movieDetails.id.toString());
      setIsFavorite(response.account_states.favorite);
      setIsInWatchlist(response.account_states.watchlist);
      const userRating = response.account_states.rated;
      if (typeof userRating === "object" && userRating?.value) {
        setIsRated(true);
        setUserRatingApi(userRating.value);
      }
      if (typeof userRating === "boolean") setIsRated(userRating);
    }
    if (type === "tvshow" && tvShowDetails) {
      const response = await getTvShowDetail(tvShowDetails.id.toString());
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
      {/* Screen size < md */}
      <div className="fixed bottom-0 left-0 z-20 w-full bg-primary md:hidden">
        {watchProvidersFr && watchProvidersFr.length > 0 && (
          <div className="w-full bg-primary/90">
            <div className="flex flex-row flex-wrap items-center justify-center">
              {watchProvidersFr.map((watchProvider) => (
                <div
                  key={watchProvider.provider_id}
                  className="my-2 mr-2 size-10"
                >
                  <picture>
                    <img
                      alt={`logo-${watchProvider.provider_name}`}
                      src={
                        watchProvider.logo_path
                          ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w500${watchProvider.logo_path}`
                          : "/images/defaultImage.png"
                      }
                      width={0}
                      height={0}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        minWidth: "100%",
                        minHeight: "100%",
                        borderWidth: 0,
                        outline: 0,
                        borderRadius: 5,
                      }}
                      sizes="100vw"
                    />
                  </picture>
                </div>
              ))}
            </div>
          </div>
        )}
        {isFavorite !== undefined &&
          isInWatchlist !== undefined &&
          isRated !== undefined &&
          type !== "episode" &&
          !isCollection && (
            <div className="flex flex-row items-center justify-evenly">
              <AccountInteraction
                item={{
                  id: movieDetails?.id || tvShowDetails?.id || 0,
                  name: tvShowDetails?.name,
                  title: movieDetails?.title,
                  genres: genres,
                  poster_path:
                    movieDetails?.poster_path ||
                    tvShowDetails?.poster_path ||
                    "",
                  overview: overview || "",
                  release_date: releaseDate || "",
                }}
                type={type}
                user={user}
                fetchUserDatas={fetchUserAccountStates}
                mediaDetailsPageProps={{
                  isFavorite,
                  isInWatchlist,
                  isRated,
                  userRatingApi,
                  userMovies,
                  userMoviesId,
                  internalMovies,
                }}
                userLists={userLists}
              />
            </div>
          )}
      </div>

      {openTrailer && trailer && (
        <YoutubeEmbed embedId={trailer.key} setOpenTrailer={setOpenTrailer} />
      )}

      {/* All screen sizes */}
      <div className="text-center md:my-4 md:ml-10 md:text-start">
        <h1 className="text-xl font-bold md:text-3xl">
          {movieDetails?.title ||
            episodeDetails?.name ||
            (type === "tvshow" && tvShowDetails?.name) ||
            collectionDetails?.name}
          <span className="text-base font-normal text-gray-400 md:text-2xl">
            {" "}
            {!isCollection && type !== "episode"
              ? releaseDate
                ? `(${dayjs(releaseDate).format("YYYY")})`
                : "(Non sortie)"
              : null}
          </span>
        </h1>

        {/* Screen size > md */}
        <div className="mt-2 hidden text-sm md:block">
          {type === "movie" && !isCollection ? (
            <div className="text-gray-400">
              <div className="flex flex-row items-center justify-start">
                <p className="pr-3 text-gray-400">
                  <span className="font-bold text-white">
                    Date de sortie :{" "}
                  </span>
                  {movieDetails?.release_date
                    ? dayjs(movieDetails?.release_date).format("DD MMMM YYYY")
                    : "Non sortie"}{" "}
                  (FR)
                </p>
                <p className="pr-3 text-gray-400">
                  <span className="font-bold text-white">Durée : </span>
                  {runtimeHours} h {runtimeMinutes} min
                </p>
              </div>
            </div>
          ) : null}
          {(type === "tvshow" || type === "episode") && (
            <div className="flex flex-row items-center justify-start">
              <p className="pr-3 text-gray-400">
                <span className="font-bold text-white">Date de sortie : </span>
                {releaseDate
                  ? dayjs(releaseDate).format("DD MMMM YYYY")
                  : "Non sortie"}{" "}
                (FR)
              </p>
              {type === "tvshow" &&
                tvShowDetails?.episode_run_time &&
                tvShowDetails.episode_run_time.length > 0 && (
                  <div className="flex flex-row items-center justify-start">
                    <p className="pr-3 font-bold text-white">
                      Durée d&apos;un épisode :{" "}
                      {tvShowDetails.episode_run_time.map((runtime, index) => {
                        if (
                          index ===
                          tvShowDetails.episode_run_time.length - 1
                        ) {
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
              {type === "episode" && (
                <p className="pr-3 text-gray-400">
                  <span className="font-bold text-white">Durée : </span>
                  {episodeDetails?.runtime} min
                </p>
              )}
              {tvShowDetails?.status && (
                <p className="text-gray-400">
                  <span className="font-bold text-white">Statut : </span>
                  {tvShowDetails.status === "Ended" ? (
                    <span className="text-gray-400">Terminée</span>
                  ) : tvShowDetails.status === "Canceled" ? (
                    <span className="text-gray-400">Annulée</span>
                  ) : (
                    <span className="text-gray-400">En cours</span>
                  )}
                </p>
              )}
            </div>
          )}
          <div className="flex flex-row flex-wrap items-center justify-start">
            {genres && (
              <p className="pr-3 pt-2">
                <span className="font-bold">Genres : </span>

                {genres.map((genre, index) => {
                  if (index === genres.length - 1) {
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
            )}
            {originalLanguageName && (
              <p className="pr-3 pt-2 text-gray-400">
                <span className="font-bold text-white">Langue : </span>
                {originalLanguageName}
              </p>
            )}
            {type === "tvshow" && tvShowDetails?.number_of_seasons && (
              <div className="flex flex-row items-center justify-start">
                <p className="pr-3 pt-2 text-gray-400">
                  <span className="font-bold text-white">Saisons : </span>
                  {tvShowDetails.number_of_seasons}
                </p>
              </div>
            )}
            {seasonNumber && (
              <div className="flex flex-row items-center justify-start">
                <p className="pr-3 pt-2 text-gray-400">
                  <span className="font-bold text-white">Saison : </span>
                  {seasonNumber}
                </p>
              </div>
            )}
            {type === "tvshow" && tvShowDetails?.number_of_episodes && (
              <div className="flex flex-row items-center justify-start">
                <p className="pr-3 pt-2 text-gray-400">
                  <span className="font-bold text-white">Episodes : </span>
                  {tvShowDetails.number_of_episodes}
                </p>
              </div>
            )}
            {episodeNumber && (
              <div className="flex flex-row items-center justify-start">
                <p className="pr-3 pt-2 text-gray-400">
                  <span className="font-bold text-white">Episode : </span>
                  {episodeNumber}
                </p>
              </div>
            )}
            {episodePrecedent && seasonNumber && episodeNumber && (
              <div className="flex flex-row items-center justify-start">
                <p className="pr-3 pt-2 text-gray-400">
                  <span className="font-bold text-white">
                    Episode précédent :{" "}
                  </span>
                  S
                  {episodePrecedent.season_number > 9
                    ? episodePrecedent.season_number
                    : `0${episodePrecedent.season_number}`}
                  E
                  {episodePrecedent.episode_number > 9
                    ? episodePrecedent.episode_number
                    : `0${episodePrecedent.episode_number}`}{" "}
                  - {episodePrecedent.name}
                </p>
              </div>
            )}
            {type === "tvshow" && tvShowDetails?.next_episode_to_air && (
              <div className="flex flex-row items-center justify-start">
                <p className="pr-3 pt-2 text-gray-400">
                  <span className="font-bold text-white">
                    Prochaine sortie :{" "}
                  </span>
                  S
                  {tvShowDetails.next_episode_to_air.season_number > 9
                    ? tvShowDetails.next_episode_to_air.season_number
                    : `0${tvShowDetails.next_episode_to_air.season_number}`}
                  E
                  {tvShowDetails.next_episode_to_air.episode_number > 9
                    ? tvShowDetails.next_episode_to_air.episode_number
                    : `0${tvShowDetails.next_episode_to_air.episode_number}`}{" "}
                  - {tvShowDetails.next_episode_to_air.name} - Le{" "}
                  {dayjs(tvShowDetails.next_episode_to_air.air_date).format(
                    "DD MMMM YYYY",
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* All screen sizes */}
      <div className="m-4 ml-10 flex flex-row items-center justify-evenly md:justify-start">
        <div className="flex flex-row items-center justify-evenly">
          <div className="flex flex-col items-center justify-center md:mr-10 md:items-start">
            <p className="font-bold">Note moyenne</p>
            <StarRating
              count={5}
              value={
                movieDetails?.vote_average
                  ? movieDetails.vote_average / 2
                  : episodeDetails?.vote_average
                    ? episodeDetails.vote_average / 2
                    : tvShowDetails?.vote_average
                      ? tvShowDetails.vote_average / 2
                      : voteAverageCollection
                        ? voteAverageCollection / 2
                        : 0
              }
              size={20}
              edit={false}
            />
            {!isCollection && (
              <p className="mt-1 text-xs text-gray-400">
                (
                {movieDetails?.vote_count ||
                  episodeDetails?.vote_count ||
                  tvShowDetails?.vote_count}{" "}
                vote
                {movieDetails?.vote_count && movieDetails.vote_count > 1
                  ? "s"
                  : ""}
                {type === "tvshow" &&
                tvShowDetails?.vote_count &&
                tvShowDetails.vote_count > 1
                  ? "s"
                  : ""}
                {episodeDetails?.vote_count && episodeDetails.vote_count > 1
                  ? "s"
                  : ""}
                )
              </p>
            )}
          </div>
          {type === "episode" &&
            episodeDetails?.account_states &&
            episodeNumber &&
            seasonNumber &&
            tvShowId && (
              <div className="ml-6">
                <AccountInteraction
                  item={episodeDetails}
                  type={type}
                  user={user}
                  fetchUserDatas={fetchUserAccountStates}
                  episodeDetailsProps={{
                    episodeNumber,
                    id: episodeDetails.id,
                    isRated,
                    seasonNumber,
                    tvShowId,
                    userRatingApi,
                  }}
                  userLists={userLists}
                />
              </div>
            )}
        </div>
        <div className="flex flex-row items-center justify-evenly md:mx-10">
          <>
            {isFavorite !== undefined &&
              isInWatchlist !== undefined &&
              isRated !== undefined &&
              type !== "episode" &&
              !isCollection && (
                <div className="hidden md:mr-10 md:block">
                  <AccountInteraction
                    item={{
                      id: movieDetails?.id || tvShowDetails?.id || 0,
                      name: tvShowDetails?.name,
                      title: movieDetails?.title,
                      genres: genres,
                      poster_path:
                        movieDetails?.poster_path ||
                        tvShowDetails?.poster_path ||
                        "",
                      overview: overview || "",
                      release_date: releaseDate || "",
                    }}
                    type={type}
                    user={user}
                    fetchUserDatas={fetchUserAccountStates}
                    mediaDetailsPageProps={{
                      isFavorite,
                      isInWatchlist,
                      isRated,
                      userRatingApi,
                      userMovies,
                      userMoviesId,
                      internalMovies,
                    }}
                    userLists={userLists}
                  />
                </div>
              )}
            {trailer && (
              <Button variant="light" onClick={() => setOpenTrailer(true)}>
                <FaPlay size={12} className="text-white" />
                Bande annonce
              </Button>
            )}
          </>
        </div>
      </div>

      {/* Screen size < md */}
      <div className="my-4 flex flex-col items-center justify-center px-[10%] text-sm text-gray-400 md:hidden">
        {type === "movie" && !isCollection && (
          <>
            <p>
              <span className="font-bold text-white">Date de sortie : </span>
              {releaseDate
                ? dayjs(releaseDate).format("DD MMMM YYYY")
                : "Non sortie"}{" "}
              (FR)
            </p>
            <div className="flex flex-row items-center justify-center pt-2">
              <p className="pt-2">
                <span className="font-bold text-white">Durée : </span>
                {runtimeHours} h {runtimeMinutes} min
              </p>
              {originalLanguageName && (
                <p className="pt-2">
                  <span className="font-bold text-white">Langue : </span>
                  {originalLanguageName}
                </p>
              )}
            </div>
          </>
        )}
        {(type === "tvshow" || type === "episode") && (
          <div className="flex flex-col items-center justify-start md:flex-row">
            <p className="text-gray-400">
              <span className="font-bold text-white">Date de sortie : </span>
              {releaseDate
                ? dayjs(releaseDate).format("DD MMMM YYYY")
                : "Non sortie"}{" "}
              (FR)
            </p>
            <div className="flex flex-row flex-wrap items-center justify-center pt-2">
              <>
                {type === "tvshow" &&
                  tvShowDetails?.episode_run_time &&
                  tvShowDetails.episode_run_time?.length > 0 && (
                    <div className="flex flex-row items-center justify-start">
                      <p className="pr-3 font-bold text-white">
                        Durée d&apos;un épisode :{" "}
                        {tvShowDetails.episode_run_time.map(
                          (runtime, index) => {
                            if (
                              index ===
                              tvShowDetails.episode_run_time.length - 1
                            ) {
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
                          },
                        )}
                      </p>
                    </div>
                  )}
                {type === "episode" && (
                  <p className="pr-3 pt-2 text-gray-400">
                    <span className="font-bold text-white">Durée : </span>
                    {episodeDetails?.runtime} min
                  </p>
                )}
                {tvShowDetails?.status && (
                  <p className="pr-3 pt-2 text-gray-400">
                    <span className="font-bold text-white">Statut : </span>
                    {tvShowDetails.status === "Ended" ? (
                      <span className="text-gray-400">Terminée</span>
                    ) : tvShowDetails.status === "Canceled" ? (
                      <span className="text-gray-400">Annulée</span>
                    ) : (
                      <span className="text-gray-400">En cours</span>
                    )}
                  </p>
                )}
              </>
              {originalLanguageName && (
                <p className="pt-2">
                  <span className="font-bold text-white">Langue : </span>
                  {originalLanguageName}
                </p>
              )}
            </div>
          </div>
        )}
        {genres && (
          <p className="pt-2 text-center">
            <span className="font-bold text-white">Genres : </span>
            {genres.map((genre, index) => {
              if (index === genres.length - 1) {
                return <span key={genre.id}>{genre?.name}</span>;
              }
              return <span key={genre.id}>{genre?.name}, </span>;
            })}
          </p>
        )}
        {type === "tvshow" &&
          tvShowDetails?.number_of_episodes &&
          tvShowDetails?.number_of_seasons && (
            <div className="flex flex-row flex-wrap items-center justify-center">
              <div className="flex flex-row items-center justify-start">
                <p className="pr-3 pt-2 text-gray-400">
                  <span className="font-bold text-white">Saisons : </span>
                  {tvShowDetails.number_of_seasons}
                </p>
              </div>
              <div className="flex flex-row items-center justify-start">
                <p className="pr-3 pt-2 text-gray-400">
                  <span className="font-bold text-white">Episodes : </span>
                  {tvShowDetails.number_of_episodes}
                </p>
              </div>
            </div>
          )}
        {episodeNumber && seasonNumber && (
          <div className="flex flex-row flex-wrap items-center justify-center">
            <div className="flex flex-row items-center justify-start">
              <p className="pr-3 pt-2 text-gray-400">
                <span className="font-bold text-white">Saison : </span>
                {seasonNumber}
              </p>
            </div>
            <div className="flex flex-row items-center justify-start">
              <p className="pr-3 pt-2 text-gray-400">
                <span className="font-bold text-white">Episode : </span>
                {episodeNumber}
              </p>
            </div>
          </div>
        )}
        {episodePrecedent && seasonNumber && episodeNumber && (
          <div className="flex flex-row items-center justify-start">
            <p className="pr-3 pt-2 text-gray-400">
              <span className="font-bold text-white">Episode précédent : </span>
              S
              {episodePrecedent.season_number > 9
                ? episodePrecedent.season_number
                : `0${episodePrecedent.season_number}`}
              E
              {episodePrecedent.episode_number > 9
                ? episodePrecedent.episode_number
                : `0${episodePrecedent.episode_number}`}{" "}
              - {episodePrecedent.name}
            </p>
          </div>
        )}
        {type === "tvshow" && tvShowDetails?.next_episode_to_air && (
          <div className="flex flex-row items-center justify-start">
            <p className="pr-3 pt-8 text-center text-gray-400">
              <span className="font-bold text-white">Prochaine sortie : </span>S
              {tvShowDetails.next_episode_to_air.season_number > 9
                ? tvShowDetails.next_episode_to_air.season_number
                : `0${tvShowDetails.next_episode_to_air.season_number}`}
              E
              {tvShowDetails.next_episode_to_air.episode_number > 9
                ? tvShowDetails.next_episode_to_air.episode_number
                : `0${tvShowDetails.next_episode_to_air.episode_number}`}{" "}
              - {tvShowDetails.next_episode_to_air.name} - Le{" "}
              {dayjs(tvShowDetails.next_episode_to_air.air_date).format(
                "DD MMMM YYYY",
              )}
            </p>
          </div>
        )}
      </div>

      {/* All screen sizes */}
      <div className="m-4 ml-10">
        {(movieDetails?.tagline || tvShowDetails?.tagline) && (
          <p className="italic text-gray-400">
            {movieDetails?.tagline || tvShowDetails?.tagline}
          </p>
        )}
        <div className="my-4">
          <h2 className="pt-2 text-lg font-bold">Synopsis</h2>
          {overview && overview.length > 0 ? (
            <p className="my-4 mr-4 text-sm md:text-justify">{overview}</p>
          ) : (
            <p className="my-4 mr-4 text-sm md:text-justify">Non renseigné</p>
          )}
        </div>
      </div>

      {/* All screen sizes */}
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
