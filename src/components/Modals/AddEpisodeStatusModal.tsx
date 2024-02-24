/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import ModalComponent from "@/components/Modals/ModalComponent";
import { addItemsToList, checkItemStatus } from "@/libs/api/lists";
import { getAllEpisodesByTvId } from "@/libs/sanity/api/episode";
import { Episode, InternalTv, SeasonDetails } from "@/models/tvs";
import { getSeasonDetails } from "@/libs/api/tvs";
import Loading from "../Loading/Loading";

type Props = {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  tvFromDb: InternalTv;
  tvId: string;
  tvTmdbId: number;
};

const AddEpisodeStatusModal: FC<Props> = ({
  modalIsOpen,
  setModalIsOpen,
  tvFromDb,
  tvId,
  tvTmdbId,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<string>("Saison 1");
  const [selectedEpisode, setSelectedEpisode] = useState<string>(
    "Saison 1 - Episode 1",
  );
  const [listOfEpisodes, setListOfEpisodes] = useState<Episode[]>([]);
  const [seasonsDetails, setSeasonsDetails] = useState<SeasonDetails[]>([]);

  const fetchSeasonsDetailsFromTmdb = async () => {
    let seasons: SeasonDetails[] = [];
    for (let i = 1; i <= tvFromDb.number_of_seasons; i++) {
      const response = await getSeasonDetails(tvTmdbId, i);
      seasons.push(response);
    }
    setSeasonsDetails(seasons);
    setListOfEpisodes(seasons[0].episodes);
  };

  useEffect(() => {
    fetchSeasonsDetailsFromTmdb();
  }, [tvId]);

  console.log(seasonsDetails, listOfEpisodes);

  const handleSeasonSelectionChange = (e: any) => {
    setSelectedSeason(e.target.value);
    setListOfEpisodes(
      seasonsDetails.find((season) => season.name === e.target.value)
        ?.episodes || [],
    );
    setSelectedEpisode(`${e.target.value} - Episode 1`);
  };

  const handleEpisodeSelectionChange = (e: any) => {
    setSelectedEpisode(e.target.value);
  };

  /* const onValidate = async () => {
    if (itemStatus) {
      toast.error("Cet élément est déjà présent dans la liste sélectionnée");
    }
    if (selectedSeason === "1") {
      setModalIsOpen(false);
      setItemStatus(false);
      setSelectedSeason("1");
      router.push("/profil/lists/create");
    }
    if (!itemStatus && selectedSeason !== "1") {
      const items = [
        { media_type: itemType === "movie" ? "movie" : "tv", media_id: itemId },
      ];
      const responseAddToList = await addItemsToList(
        Number(selectedSeason),
        items,
      );
      if (responseAddToList.success) {
        toast.success("L'élément a bien été ajouté à la liste");
      } else {
        toast.error(
          `Une erreur est survenue : ${responseAddToList.status_message}`,
        );
      }
      setModalIsOpen(false);
      setItemStatus(false);
      setSelectedSeason("1");
    }
  };
 */
  const onClose = () => {
    setModalIsOpen(false);
    setSeasonsDetails([]);
  };

  return (
    <ModalComponent
      modalIsOpen={modalIsOpen}
      className="min-h-[500px]"
      title="Marquer les épisodes"
      onValidate={Promise.resolve}
      onClose={onClose}
    >
      {seasonsDetails &&
      seasonsDetails.length > 0 &&
      listOfEpisodes &&
      listOfEpisodes.length > 0 ? (
        <div className="flex flex-col items-center justify-center">
          <Select
            placeholder="Liste des saisons"
            defaultSelectedKeys={["Saison 1"]}
            selectedKeys={[selectedSeason]}
            onChange={handleSeasonSelectionChange}
            label="Saisons"
            className="mb-4"
          >
            {seasonsDetails.map((season) => (
              <SelectItem key={season.name} value={season.name}>
                {season.name}
              </SelectItem>
            ))}
          </Select>
          <Select
            placeholder="Liste des épisodes"
            defaultSelectedKeys={["Saison 1 - Episode 1"]}
            selectedKeys={[selectedEpisode]}
            onChange={handleEpisodeSelectionChange}
            label="Episodes"
          >
            {listOfEpisodes.map((episode) => (
              <SelectItem
                key={`Saison ${episode.season_number} - Episode ${episode.episode_number}`}
                value={`Saison ${episode.season_number} - Episode ${episode.episode_number}`}
              >
                {`${episode.name} (épisode ${episode.episode_number})`}
              </SelectItem>
            ))}
          </Select>
        </div>
      ) : (
        <Loading />
      )}
    </ModalComponent>
  );
};

export default AddEpisodeStatusModal;
