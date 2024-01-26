/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Listbox,
  ListboxItem,
  ListboxSection,
  Slider,
  Accordion,
  AccordionItem,
  RadioGroup,
  Radio,
  Select,
  SelectSection,
  SelectItem,
} from "@nextui-org/react";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import Image from "next/image";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);

import FiltersWrapper from "./FiltersWrapper";
import { Watcher } from "@/models/watchers";
import { MoviesFilters, TvShowsFilters } from "@/models/filters";
import { extraLanguages, topLanguages } from "@/libs/helpers/languages";

type Props = {
  moviesFilters?: MoviesFilters;
  setMoviesFilters?: Dispatch<SetStateAction<MoviesFilters>>;
  tvshowsFilters?: TvShowsFilters;
  setTvShowsFilters?: Dispatch<SetStateAction<TvShowsFilters>>;
  genres: {
    id: number;
    name: string;
  }[];
  providers: Watcher[];
  setIsFiltering: Dispatch<SetStateAction<boolean>>;
  isResetting: boolean;
  setIsResetting: Dispatch<SetStateAction<boolean>>;
};

const Filters: FC<Props> = (props) => {
  const {
    moviesFilters,
    setMoviesFilters,
    tvshowsFilters,
    setTvShowsFilters,
    genres,
    providers,
    setIsFiltering,
    isResetting,
    setIsResetting,
  } = props;
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    moviesFilters && moviesFilters?.["primary_release_date.gte"]
      ? new Date(moviesFilters["primary_release_date.gte"] as string)
      : tvshowsFilters && tvshowsFilters?.["first_air_date.gte"]
        ? new Date(tvshowsFilters["first_air_date.lte"] as string)
        : null,
    moviesFilters && moviesFilters?.["primary_release_date.lte"]
      ? new Date(moviesFilters["primary_release_date.lte"] as string)
      : tvshowsFilters && tvshowsFilters?.["first_air_date.lte"]
        ? new Date(tvshowsFilters["first_air_date.lte"] as string)
        : null,
  ]);
  const [startDate, endDate] = dateRange;
  const [voteAverage, setVoteAverage] = useState<number[]>([
    moviesFilters?.["vote_average.gte"] ||
      tvshowsFilters?.["vote_average.gte"] ||
      0,
    moviesFilters?.["vote_average.lte"] ||
      tvshowsFilters?.["vote_average.lte"] ||
      10,
  ]);
  const [voteCount, setVoteCount] = useState<number>(
    moviesFilters?.["vote_count.gte"] ||
      tvshowsFilters?.["vote_count.gte"] ||
      0,
  );
  const [runtime, setRuntime] = useState<number[]>([
    moviesFilters?.["with_runtime.gte"] ||
      tvshowsFilters?.["with_runtime.gte"] ||
      0,
    moviesFilters?.["with_runtime.lte"] ||
      tvshowsFilters?.["with_runtime.lte"] ||
      400,
  ]);
  const [selectedWatchers, setSelectedWatchers] = useState<string[]>(
    moviesFilters?.with_watch_providers?.split("|") ||
      tvshowsFilters?.with_watch_providers?.split("|") ||
      [],
  );
  const [selectedWatchList, setSelectedWatchList] = useState<string>(
    moviesFilters?.show_me.toString() ||
      tvshowsFilters?.show_me.toString() ||
      "0",
  );
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    moviesFilters?.with_genres?.split(",") ||
      tvshowsFilters?.with_genres?.split(",") ||
      [],
  );
  const [unselectedGenres, setUnselectedGenres] = useState<string[]>(
    moviesFilters?.without_genres?.split(",") ||
      tvshowsFilters?.without_genres?.split(",") ||
      [],
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    moviesFilters?.with_original_language ||
      tvshowsFilters?.with_original_language ||
      "all",
  );

  const handleSelectedLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    moviesFilters &&
      setMoviesFilters &&
      setMoviesFilters({
        ...moviesFilters,
        with_original_language: e.target.value,
      });
    tvshowsFilters &&
      setTvShowsFilters &&
      setTvShowsFilters({
        ...tvshowsFilters,
        with_original_language: e.target.value,
      });
  };
  const handleSelectedWatchList = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedWatchList(e.target.value);
    moviesFilters &&
      setMoviesFilters &&
      setMoviesFilters({ ...moviesFilters, show_me: Number(e.target.value) });
    tvshowsFilters &&
      setTvShowsFilters &&
      setTvShowsFilters({ ...tvshowsFilters, show_me: Number(e.target.value) });
  };

  useEffect(() => {
    if (
      startDate ||
      endDate ||
      voteCount !== 0 ||
      selectedWatchers.length > 0 ||
      selectedWatchList !== "0" ||
      selectedGenres.length > 0 ||
      unselectedGenres.length > 0 ||
      selectedLanguage !== "all"
    ) {
      setIsFiltering(true);
    } else {
      setIsFiltering(false);
    }
  }, [
    endDate,
    selectedGenres.length,
    selectedLanguage,
    selectedWatchList,
    selectedWatchers.length,
    startDate,
    unselectedGenres.length,
    voteCount,
  ]);

  useEffect(() => {
    if (isResetting && moviesFilters) {
      setDateRange([
        moviesFilters["primary_release_date.gte"]
          ? new Date(moviesFilters["primary_release_date.gte"] as string)
          : null,
        moviesFilters["primary_release_date.lte"]
          ? new Date(moviesFilters["primary_release_date.lte"] as string)
          : null,
      ]);
      setVoteAverage([
        moviesFilters?.["vote_average.gte"] || 0,
        moviesFilters?.["vote_average.lte"] || 10,
      ]);
      setVoteCount(moviesFilters?.["vote_count.gte"] || 0);
      setRuntime([
        moviesFilters?.["with_runtime.gte"] || 0,
        moviesFilters?.["with_runtime.lte"] || 400,
      ]);
      setSelectedWatchers(
        moviesFilters?.with_watch_providers?.split("|") || [],
      );
      setSelectedWatchList(moviesFilters?.show_me.toString() || "0");
      setSelectedGenres(moviesFilters?.with_genres?.split(",") || []);
      setUnselectedGenres(moviesFilters?.without_genres?.split(",") || []);
      setSelectedLanguage(moviesFilters?.with_original_language || "all");
      setIsResetting(false);
    }
    if (isResetting && tvshowsFilters) {
      setDateRange([
        tvshowsFilters["first_air_date.gte"]
          ? new Date(tvshowsFilters["first_air_date.gte"] as string)
          : null,
        tvshowsFilters["first_air_date.lte"]
          ? new Date(tvshowsFilters["first_air_date.lte"] as string)
          : null,
      ]);
      setVoteAverage([
        tvshowsFilters?.["vote_average.gte"] || 0,
        tvshowsFilters?.["vote_average.lte"] || 10,
      ]);
      setVoteCount(tvshowsFilters?.["vote_count.gte"] || 0);
      setRuntime([
        tvshowsFilters?.["with_runtime.gte"] || 0,
        tvshowsFilters?.["with_runtime.lte"] || 400,
      ]);
      setSelectedWatchers(
        tvshowsFilters?.with_watch_providers?.split("|") || [],
      );
      setSelectedWatchList(tvshowsFilters?.show_me.toString() || "0");
      setSelectedGenres(tvshowsFilters?.with_genres?.split(",") || []);
      setUnselectedGenres(tvshowsFilters?.without_genres?.split(",") || []);
      setSelectedLanguage(tvshowsFilters?.with_original_language || "all");
      setIsResetting(false);
    }
  }, [isResetting, moviesFilters, tvshowsFilters]);

  return (
    <div className="lg:mr-4 lg:w-[25%] lg:min-w-[350px]">
      <FiltersWrapper>
        <Listbox
          topContent={
            <h3 className="mb-4 text-lg font-bold">Options de filtres</h3>
          }
          aria-label="Filtrer"
        >
          <ListboxSection
            showDivider
            title="Afficher"
            classNames={{
              heading: "text-sm",
            }}
          >
            <ListboxItem key="check_all_watch" textValue="check_all_watch">
              <RadioGroup
                aria-label="Sélection watchlist"
                value={selectedWatchList}
                onChange={handleSelectedWatchList}
                color="secondary"
                className="mx-2"
              >
                <Radio value="0">Tous</Radio>
                <Radio value="1">Non vu</Radio>
                <Radio value="2">Déjà vu</Radio>
              </RadioGroup>
            </ListboxItem>
          </ListboxSection>
          <ListboxSection
            showDivider
            title="Langues"
            classNames={{
              heading: "text-sm",
            }}
          >
            <ListboxItem
              key="with_original_language"
              textValue="with_original_language"
            >
              <Select
                aria-label="Langue"
                variant="bordered"
                placeholder="Sélectionner une langue"
                selectedKeys={[selectedLanguage]}
                onChange={handleSelectedLanguage}
              >
                <SelectSection showDivider>
                  {topLanguages.map((language) => (
                    <SelectItem key={language.code} value={language.code}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectSection>
                <SelectSection>
                  {extraLanguages.map((language) => (
                    <SelectItem key={language.code} value={language.code}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectSection>
              </Select>
            </ListboxItem>
          </ListboxSection>
          <ListboxSection
            showDivider
            title="Dates de sortie (sélection d'une période)"
            classNames={{
              heading: "text-sm",
            }}
          >
            <ListboxItem
              key="primary_release_date"
              textValue="primary_release_date"
              startContent={<BsCalendarDateFill className="mr-2" />}
            >
              <DatePicker
                locale="fr"
                dateFormat={"dd/MM/yyyy"}
                showMonthDropdown
                showYearDropdown
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                openToDate={new Date()}
                isClearable
                onChange={(date: [Date | null, Date | null]) => {
                  setDateRange(date);
                  if (moviesFilters && setMoviesFilters) {
                    setMoviesFilters({
                      ...moviesFilters,
                      "primary_release_date.gte": date[0]
                        ? `${dayjs(date[0]).format("YYYY-MM-DD")}`
                        : null,
                      "primary_release_date.lte": date[1]
                        ? `${dayjs(date[1]).format("YYYY-MM-DD")}`
                        : null,
                    });
                  }
                  if (tvshowsFilters && setTvShowsFilters) {
                    setTvShowsFilters({
                      ...tvshowsFilters,
                      "first_air_date.gte": date[0]
                        ? `${dayjs(date[0]).format("YYYY-MM-DD")}`
                        : null,
                      "first_air_date.lte": date[1]
                        ? `${dayjs(date[1]).format("YYYY-MM-DD")}`
                        : null,
                    });
                  }
                }}
                className="max-w-[220px] rounded-lg bg-primary text-xs xl:text-base"
              />
            </ListboxItem>
          </ListboxSection>
          <ListboxSection
            showDivider
            title="Genres"
            classNames={{
              group: "flex flex-row flex-wrap justify-center items-center",
              heading: "text-sm",
            }}
          >
            {genres.map((genre) => (
              <ListboxItem
                key={genre.id}
                textValue={genre.name}
                classNames={{
                  base: `${selectedGenres.includes(genre.id.toString()) ? "border-secondary text-secondary" : unselectedGenres.includes(genre.id.toString()) ? "border-danger text-danger" : ""} border rounded-xl m-2 px-3 py-2 max-w-fit`,
                }}
                onClick={() => {
                  if (
                    !selectedGenres.includes(genre.id.toString()) &&
                    !unselectedGenres.includes(genre.id.toString())
                  ) {
                    setSelectedGenres([...selectedGenres, genre.id.toString()]);
                    if (moviesFilters && setMoviesFilters) {
                      setMoviesFilters({
                        ...moviesFilters,
                        with_genres: [...selectedGenres, genre.id].join(","),
                      });
                    }
                    if (tvshowsFilters && setTvShowsFilters) {
                      setTvShowsFilters({
                        ...tvshowsFilters,
                        with_genres: [...selectedGenres, genre.id].join(","),
                      });
                    }
                  }
                  if (selectedGenres.includes(genre.id.toString())) {
                    setSelectedGenres(
                      selectedGenres.filter((g) => g !== genre.id.toString()),
                    );
                    setUnselectedGenres([
                      ...unselectedGenres,
                      genre.id.toString(),
                    ]);
                    if (moviesFilters && setMoviesFilters) {
                      setMoviesFilters({
                        ...moviesFilters,
                        with_genres: selectedGenres
                          .filter((g) => g !== genre.id.toString())
                          .join(","),
                        without_genres: [...unselectedGenres, genre.id].join(
                          ",",
                        ),
                      });
                    }
                    if (tvshowsFilters && setTvShowsFilters) {
                      setTvShowsFilters({
                        ...tvshowsFilters,
                        with_genres: selectedGenres
                          .filter((g) => g !== genre.id.toString())
                          .join(","),
                        without_genres: [...unselectedGenres, genre.id].join(
                          ",",
                        ),
                      });
                    }
                  }
                  if (unselectedGenres.includes(genre.id.toString())) {
                    setUnselectedGenres(
                      unselectedGenres.filter((g) => g !== genre.id.toString()),
                    );
                    if (moviesFilters && setMoviesFilters) {
                      setMoviesFilters({
                        ...moviesFilters,
                        without_genres: unselectedGenres
                          .filter((g) => g !== genre.id.toString())
                          .join(","),
                      });
                    }
                    if (tvshowsFilters && setTvShowsFilters) {
                      setTvShowsFilters({
                        ...tvshowsFilters,
                        without_genres: unselectedGenres
                          .filter((g) => g !== genre.id.toString())
                          .join(","),
                      });
                    }
                  }
                }}
              >
                {genre.name}
              </ListboxItem>
            ))}
          </ListboxSection>
          <ListboxSection showDivider>
            <ListboxItem key="watchers" textValue="watchers">
              <Accordion>
                <AccordionItem
                  key="Liste des plateformes"
                  aria-label="Liste des plateformes"
                  title="Liste des plateformes"
                  classNames={{
                    content:
                      "flex flex-row flex-wrap justify-center items-center",
                  }}
                >
                  {providers.map((provider) => (
                    <div
                      key={provider.provider_id}
                      className="relative m-1"
                      onClick={() => {
                        if (
                          !selectedWatchers.includes(
                            provider.provider_id.toString(),
                          )
                        ) {
                          setSelectedWatchers([
                            ...selectedWatchers,
                            provider.provider_id.toString(),
                          ]);
                          if (moviesFilters && setMoviesFilters) {
                            setMoviesFilters({
                              ...moviesFilters,
                              with_watch_providers: [
                                ...selectedWatchers,
                                provider.provider_id,
                              ].join("|"),
                            });
                          }
                          if (tvshowsFilters && setTvShowsFilters) {
                            setTvShowsFilters({
                              ...tvshowsFilters,
                              with_watch_providers: [
                                ...selectedWatchers,
                                provider.provider_id,
                              ].join("|"),
                            });
                          }
                        } else {
                          setSelectedWatchers(
                            selectedWatchers.filter(
                              (watcher) =>
                                watcher !== provider.provider_id.toString(),
                            ),
                          );
                          if (moviesFilters && setMoviesFilters) {
                            setMoviesFilters({
                              ...moviesFilters,
                              with_watch_providers: selectedWatchers
                                .filter(
                                  (w) => w !== provider.provider_id.toString(),
                                )
                                .join("|"),
                            });
                          }
                          if (tvshowsFilters && setTvShowsFilters) {
                            setTvShowsFilters({
                              ...tvshowsFilters,
                              with_watch_providers: selectedWatchers
                                .filter(
                                  (w) => w !== provider.provider_id.toString(),
                                )
                                .join("|"),
                            });
                          }
                        }
                      }}
                    >
                      <Image
                        alt={provider.provider_name}
                        src={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w45${provider.logo_path}`}
                        width={0}
                        height={0}
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: 5,
                        }}
                        sizes="100vw"
                      />
                      <div
                        className={`absolute left-0 top-0 flex size-full items-center justify-center ${selectedWatchers.includes(provider.provider_id.toString()) ? "bg-secondary/70" : "hidden"}`}
                      >
                        <FaCheck className="text-white" size={20} />
                      </div>
                    </div>
                  ))}
                </AccordionItem>
              </Accordion>
            </ListboxItem>
          </ListboxSection>
          <ListboxSection
            showDivider
            title="Note des utilisateurs"
            classNames={{
              heading: "text-sm",
            }}
          >
            <ListboxItem key="vote_average" textValue="vote_average">
              <Slider
                label="Valeurs :"
                color="secondary"
                showSteps={true}
                showOutline={true}
                disableThumbScale={true}
                marks={[
                  { value: 0, label: "0" },
                  { value: 5, label: "5" },
                  { value: 10, label: "10" },
                ]}
                step={1}
                minValue={0}
                maxValue={10}
                value={voteAverage}
                classNames={{
                  base: "max-w-md",
                  filler: "bg-secondary",
                  thumb: [
                    "transition-size",
                    "bg-secondary",
                    "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                    "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
                  ],
                  step: "data-[in-range=true]:bg-white/50",
                }}
                // @ts-ignore
                onChange={(e: number[]) => {
                  setVoteAverage(e);
                  setIsFiltering(true);
                  if (moviesFilters && setMoviesFilters) {
                    setMoviesFilters({
                      ...moviesFilters,
                      "vote_average.gte": e[0],
                      "vote_average.lte": e[1],
                    });
                  }
                  if (tvshowsFilters && setTvShowsFilters) {
                    setTvShowsFilters({
                      ...tvshowsFilters,
                      "vote_average.gte": e[0],
                      "vote_average.lte": e[1],
                    });
                  }
                  if (e[0] === 0 && e[1] === 10) {
                    setIsFiltering(false);
                  }
                }}
              />
            </ListboxItem>
          </ListboxSection>
          <ListboxSection
            showDivider
            title="Nombre de votes minimum"
            classNames={{
              heading: "text-sm",
            }}
          >
            <ListboxItem key="vote_count" textValue="vote_count">
              <Slider
                label="Valeur :"
                color="secondary"
                showSteps={true}
                showOutline={true}
                disableThumbScale={true}
                marks={[
                  { value: 0, label: "0" },
                  { value: 100, label: "100" },
                  { value: 200, label: "200" },
                  { value: 300, label: "300" },
                  { value: 400, label: "400" },
                  { value: 500, label: "500" },
                ]}
                step={50}
                minValue={0}
                maxValue={500}
                value={voteCount}
                classNames={{
                  base: "max-w-md",
                  filler: "bg-secondary",
                  thumb: [
                    "transition-size",
                    "bg-secondary",
                    "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                    "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
                  ],
                  step: "data-[in-range=true]:bg-white/50",
                }}
                // @ts-ignore
                onChange={(e: number) => {
                  setVoteCount(e);
                  setIsFiltering(true);
                  if (moviesFilters && setMoviesFilters) {
                    setMoviesFilters({
                      ...moviesFilters,
                      "vote_count.gte": e,
                    });
                  }
                  if (tvshowsFilters && setTvShowsFilters) {
                    setTvShowsFilters({
                      ...tvshowsFilters,
                      "vote_count.gte": e,
                    });
                  }
                  if (e === 0) {
                    setIsFiltering(false);
                  }
                }}
              />
            </ListboxItem>
          </ListboxSection>
          <ListboxSection
            showDivider
            title="Durée (en minutes)"
            classNames={{
              heading: "text-sm",
            }}
          >
            <ListboxItem key="with_runtime" textValue="with_runtime">
              <Slider
                label="Valeur :"
                color="secondary"
                showSteps={true}
                showOutline={true}
                disableThumbScale={true}
                marks={[
                  { value: 0, label: "0" },
                  { value: 120, label: "120" },
                  { value: 240, label: "240" },
                  { value: 360, label: "360" },
                ]}
                step={15}
                minValue={0}
                maxValue={400}
                value={runtime}
                classNames={{
                  base: "max-w-md",
                  filler: "bg-secondary",
                  thumb: [
                    "transition-size",
                    "bg-secondary",
                    "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                    "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
                  ],
                  step: "data-[in-range=true]:bg-white/50",
                }}
                // @ts-ignore
                onChange={(e: number[]) => {
                  setRuntime(e);
                  setIsFiltering(true);
                  if (moviesFilters && setMoviesFilters) {
                    setMoviesFilters({
                      ...moviesFilters,
                      "with_runtime.gte": e[0],
                      "with_runtime.lte": e[1],
                    });
                  }
                  if (tvshowsFilters && setTvShowsFilters) {
                    setTvShowsFilters({
                      ...tvshowsFilters,
                      "with_runtime.gte": e[0],
                      "with_runtime.lte": e[1],
                    });
                  }
                  if (e[0] === 0 && e[1] === 400) {
                    setIsFiltering(false);
                  }
                }}
              />
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </FiltersWrapper>
    </div>
  );
};

export default Filters;
