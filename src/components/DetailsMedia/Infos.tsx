"use client";

import { FC, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button } from "@nextui-org/react";
import { FaPlay } from "react-icons/fa";

import { AccountStates, Genre, Video, WatchProviderFr } from "@/models/movies";
import StarRating from "@/components/StarRate/StarRating";
import YoutubeEmbed from "@/components/YoutubeEmbed/YoutubeEmbed";
import { CreditsMovies, CreditsTvShows } from "@/models/people";
import { languages } from "@/libs/helpers/languages";
import { getMovieDetail } from "@/libs/api/movies";
import AccountInteraction from "@/components/AccountInteraction/AccountInteraction";
import { UserContext } from "@/context/userContext";
import { List } from "@/models/lists";
import { getLists } from "@/libs/api/lists";
import { getTvShowDetail } from "@/libs/api/tvshows";
import { Episode, EpisodeToAir } from "@/models/tvShows";

type Props = {
  genresMedia: Genre[];
  id: number;
  overview: string;
  title: string;
  type: "episode" | "movie" | "tvshow";
  voteAverage: number;

  accountStates?: AccountStates;
  creditsMovies?: CreditsMovies;
  creditsTvShows?: CreditsTvShows;
  episodeAccountStates?: { id: number; rated: boolean | { value: number } };
  episodePrecedent?: Episode | undefined;
  episodeNumber?: number;
  episodeRunTime?: number[];
  isCollection?: boolean;
  nextEpisodeToAir?: EpisodeToAir | null;
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  originalLanguage?: string;
  releaseDate?: string;
  runtime?: number;
  seasonNumber?: number;
  status?: string;
  tagline?: string;
  tvShowId?: number;
  videos?: {
    id: number;
    results: Video[];
  };
  voteCount?: number;
  watchProvidersFr?: WatchProviderFr[];
};

const Infos: FC<Props> = (props) => {
  const {
    genresMedia,
    id,
    overview,
    title,
    type,
    voteAverage,

    accountStates,
    creditsMovies,
    creditsTvShows,
    episodeAccountStates,
    episodeNumber,
    episodePrecedent,
    episodeRunTime,
    isCollection,
    nextEpisodeToAir,
    numberOfSeasons,
    numberOfEpisodes,
    originalLanguage,
    releaseDate,
    runtime,
    seasonNumber,
    status,
    tagline,
    tvShowId,
    videos,
    voteCount,
    watchProvidersFr,
  } = props;

  const { user } = useContext(UserContext);

  const [openTrailer, setOpenTrailer] = useState(false);

  const [userLists, setUserLists] = useState<List[]>([]);

  const [isFavorite, setIsFavorite] = useState(accountStates?.favorite);
  const [isInWatchlist, setIsInWatchlist] = useState(accountStates?.watchlist);
  const [isRated, setIsRated] = useState(
    typeof accountStates?.rated === "boolean" ||
      typeof episodeAccountStates?.rated === "boolean"
      ? false
      : true,
  );
  const [userRatingApi, setUserRatingApi] = useState<number>(
    typeof accountStates?.rated === "object"
      ? accountStates.rated.value
      : typeof episodeAccountStates?.rated === "object"
        ? episodeAccountStates.rated.value
        : 0,
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
      {/* Screen size < md */}
      <div className="fixed bottom-0 left-0 z-20 w-full bg-primary md:hidden">
        {watchProvidersFr && watchProvidersFr.length > 0 && (
          <div className="w-full py-3">
            <div className="flex flex-col items-center justify-center bg-primary/90">
              <p className="mr-3 text-sm">
                Justwatch - Disponible en streaming sur :
              </p>
              <div className="flex flex-row flex-wrap">
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
          </div>
        )}
        {isFavorite !== undefined &&
          isInWatchlist !== undefined &&
          isRated !== undefined &&
          type !== "episode" && (
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
          )}
      </div>

      {openTrailer && trailer && (
        <YoutubeEmbed embedId={trailer.key} setOpenTrailer={setOpenTrailer} />
      )}

      {/* All screen sizes */}
      <div className="text-center md:my-4 md:ml-10 md:text-start">
        <h1 className="text-xl font-bold md:text-3xl">
          {title}
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
                  {releaseDate
                    ? dayjs(releaseDate).format("DD MMMM YYYY")
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
                episodeRunTime &&
                episodeRunTime?.length > 0 && (
                  <div className="flex flex-row items-center justify-start">
                    <p className="pr-3 font-bold text-white">
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
              {type === "episode" && (
                <p className="pr-3 text-gray-400">
                  <span className="font-bold text-white">Durée : </span>
                  {episodeRunTime} min
                </p>
              )}
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
          <div className="flex flex-row flex-wrap items-center justify-start">
            <p className="pr-3 pt-2">
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
            {originalLanguage && (
              <p className="pr-3 pt-2 text-gray-400">
                <span className="font-bold text-white">Langue : </span>
                {originalLanguageName}
              </p>
            )}
            {numberOfSeasons && (
              <div className="flex flex-row items-center justify-start">
                <p className="pr-3 pt-2 text-gray-400">
                  <span className="font-bold text-white">Saisons : </span>
                  {numberOfSeasons}
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
            {numberOfEpisodes && (
              <div className="flex flex-row items-center justify-start">
                <p className="pr-3 pt-2 text-gray-400">
                  <span className="font-bold text-white">Episodes : </span>
                  {numberOfEpisodes}
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
            {nextEpisodeToAir && (
              <div className="flex flex-row items-center justify-start">
                <p className="pr-3 pt-8 text-gray-400">
                  <span className="font-bold text-white">
                    Prochaine sortie :{" "}
                  </span>
                  S
                  {nextEpisodeToAir.season_number > 9
                    ? nextEpisodeToAir.season_number
                    : `0${nextEpisodeToAir.season_number}`}
                  E
                  {nextEpisodeToAir.episode_number > 9
                    ? nextEpisodeToAir.episode_number
                    : `0${nextEpisodeToAir.episode_number}`}{" "}
                  - {nextEpisodeToAir.name} - Le{" "}
                  {dayjs(nextEpisodeToAir.air_date).format("DD MMMM YYYY")}
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
              value={voteAverage ? voteAverage / 2 : 0}
              size={20}
              edit={false}
            />
            {!isCollection && (
              <p className="mt-1 text-xs text-gray-400">
                ({voteCount} vote
                {voteCount && voteCount > 1 ? "s" : ""})
              </p>
            )}
          </div>
          {type === "episode" &&
            episodeAccountStates &&
            episodeNumber &&
            seasonNumber &&
            tvShowId && (
              <div className="ml-6">
                <AccountInteraction
                  item={{ id: id, name: title, title: title }}
                  type={type}
                  user={user}
                  fetchUserDatas={fetchUserAccountStates}
                  episodeDetailsProps={{
                    episodeNumber,
                    id,
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
              type !== "episode" && (
                <div className="hidden md:mr-10 md:block">
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
              {originalLanguage && (
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
            {type === "tvshow" &&
              episodeRunTime &&
              episodeRunTime?.length > 0 && (
                <div className="flex flex-row items-center justify-start">
                  <p className="pt-2 font-bold text-white">
                    Durée d&apos;un épisode :{" "}
                    {episodeRunTime.map((runtime, index) => {
                      if (index === episodeRunTime.length - 1) {
                        return (
                          <span
                            key={index}
                            className="font-normal text-gray-400"
                          >
                            {runtime} min
                          </span>
                        );
                      }
                      return (
                        <span key={index} className="font-normal text-gray-400">
                          {runtime},{" "}
                        </span>
                      );
                    })}
                  </p>
                </div>
              )}
            <div className="flex flex-row flex-wrap items-center justify-center pt-2">
              <>
                {type === "tvshow" &&
                  episodeRunTime &&
                  episodeRunTime?.length > 0 && (
                    <div className="flex flex-row items-center justify-start">
                      <p className="pr-3 font-bold text-white">
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
                {type === "episode" && (
                  <p className="pr-3 pt-2 text-gray-400">
                    <span className="font-bold text-white">Durée : </span>
                    {episodeRunTime} min
                  </p>
                )}
                <p className="pr-3 pt-2 text-gray-400">
                  <span className="font-bold text-white">Statut : </span>
                  {status === "Ended" ? (
                    <span className="text-gray-400">Terminée</span>
                  ) : status === "Canceled" ? (
                    <span className="text-gray-400">Annulée</span>
                  ) : (
                    <span className="text-gray-400">En cours</span>
                  )}
                </p>
              </>

              {originalLanguage && (
                <p className="pt-2">
                  <span className="font-bold text-white">Langue : </span>
                  {originalLanguageName}
                </p>
              )}
            </div>
          </div>
        )}
        <p className="pt-2 text-center">
          <span className="font-bold text-white">Genres : </span>
          {genresMedia &&
            genresMedia.map((genre, index) => {
              if (index === genresMedia.length - 1) {
                return <span key={genre.id}>{genre?.name}</span>;
              }
              return <span key={genre.id}>{genre?.name}, </span>;
            })}
        </p>
        {numberOfEpisodes && numberOfSeasons && (
          <div className="flex flex-row flex-wrap items-center justify-center">
            <div className="flex flex-row items-center justify-start">
              <p className="pr-3 pt-2 text-gray-400">
                <span className="font-bold text-white">Saisons : </span>
                {numberOfSeasons}
              </p>
            </div>
            <div className="flex flex-row items-center justify-start">
              <p className="pr-3 pt-2 text-gray-400">
                <span className="font-bold text-white">Episodes : </span>
                {numberOfEpisodes}
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
        {nextEpisodeToAir && (
          <div className="flex flex-row items-center justify-start">
            <p className="pr-3 pt-8 text-center text-gray-400">
              <span className="font-bold text-white">Prochaine sortie : </span>S
              {nextEpisodeToAir.season_number > 9
                ? nextEpisodeToAir.season_number
                : `0${nextEpisodeToAir.season_number}`}
              E
              {nextEpisodeToAir.episode_number > 9
                ? nextEpisodeToAir.episode_number
                : `0${nextEpisodeToAir.episode_number}`}{" "}
              - {nextEpisodeToAir.name} - Le{" "}
              {dayjs(nextEpisodeToAir.air_date).format("DD MMMM YYYY")}
            </p>
          </div>
        )}
      </div>

      {/* All screen sizes */}
      <div className="m-4 ml-10">
        {tagline && <p className="italic text-gray-400">{tagline}</p>}
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
