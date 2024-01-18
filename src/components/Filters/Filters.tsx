"use client";

import React, {
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
  Checkbox,
  Accordion,
  AccordionItem,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { BsCalendarDateFill } from "react-icons/bs";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);

import FiltersWrapper from "./FiltersWrapper";
import { getGenresMovies } from "@/libs/api/movies";
import Link from "next/link";
import Image from "next/image";
import { Watcher } from "@/models/watchers";

type Props = {
  filterType: string;
  filters: any[];
  setFilters: Dispatch<SetStateAction<any[]>>;
  genres: {
    id: number;
    name: string;
  }[];
  providers: Watcher[];
};

const Filters: FC<Props> = (props) => {
  const { filterType, filters, setFilters, genres, providers } = props;
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const [voteAverage, setVoteAverage] = useState([0, 10]);
  const [voteCount, setVoteCount] = useState(0);
  const [runtime, setRuntime] = useState([0, 390]);
  const [myWatchProviders, setMyWatchProviders] = useState(false);
  const [selectedWatchers, setSelectedWatchers] = useState<Watcher[]>([]);
  const [selectedWatchList, setSelectedWatchList] = useState<string>("all");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [unselectedGenres, setUnselectedGenres] = useState<number[]>([]);

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
                onValueChange={setSelectedWatchList}
                color="secondary"
              >
                <Radio value="all">Tous</Radio>
                <Radio value="yes">
                  {filterType === "movie" ? "Films" : "Séries TV"} que j&apos;ai
                  déjà vu
                </Radio>
                <Radio value="no">
                  {filterType === "movie" ? "Films" : "Séries TV"} que je
                  n&apos;ai pas vu
                </Radio>
              </RadioGroup>
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
                onChange={(update) => setDateRange(update)}
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
                  base: `${selectedGenres.includes(genre.id) ? "border-secondary text-secondary" : unselectedGenres.includes(genre.id) ? "border-danger text-danger" : ""} border rounded-xl m-2 px-3 py-2 max-w-fit`,
                }}
                onClick={() => {
                  if (
                    !selectedGenres.includes(genre.id) &&
                    !unselectedGenres.includes(genre.id)
                  ) {
                    setSelectedGenres([...selectedGenres, genre.id]);
                  }
                  if (selectedGenres.includes(genre.id)) {
                    setSelectedGenres(
                      selectedGenres.filter((g) => g !== genre.id),
                    );
                    setUnselectedGenres([...unselectedGenres, genre.id]);
                  }
                  if (unselectedGenres.includes(genre.id)) {
                    setUnselectedGenres(
                      unselectedGenres.filter((g) => g !== genre.id),
                    );
                  }
                }}
              >
                {genre.name}
              </ListboxItem>
            ))}
          </ListboxSection>
          <ListboxSection
            title="Plateformes de diffusion"
            classNames={{
              heading: "text-sm",
            }}
          >
            <ListboxItem
              key="check_watch_providers"
              textValue="check_watch_providers"
            >
              <Checkbox
                isSelected={myWatchProviders}
                onValueChange={setMyWatchProviders}
                classNames={{ label: "text-sm text-wrap" }}
              >
                Affiner la recherche aux plateformes de streaming souscrites
              </Checkbox>
            </ListboxItem>
            <ListboxItem
              key="my_watch_providers"
              textValue="my_watch_providers"
            >
              <Link href="/" className="underline">
                Gérer mes abonnements
              </Link>
            </ListboxItem>
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
                    <Image
                      key={provider.provider_id}
                      alt={provider.provider_name}
                      src={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w45${provider.logo_path}`}
                      width={0}
                      height={0}
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 5,
                        margin: 4,
                      }}
                      sizes="100vw"
                      onClick={() => {
                        !selectedWatchers.includes(provider)
                          ? setSelectedWatchers([...selectedWatchers, provider])
                          : setSelectedWatchers(
                              selectedWatchers.filter(
                                (watcher) => watcher !== provider,
                              ),
                            );
                      }}
                    />
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
                onChange={setVoteAverage}
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
                onChange={setVoteCount}
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
                maxValue={390}
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
                onChange={setRuntime}
              />
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </FiltersWrapper>
    </div>
  );
};

export default Filters;
