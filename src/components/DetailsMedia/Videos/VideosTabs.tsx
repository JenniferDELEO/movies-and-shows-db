"use client";

import { FC } from "react";
import { Card, CardBody, Chip, Tab, Tabs } from "@nextui-org/react";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

import { Video } from "@/models/movies";

dayjs.locale("fr");

dayjs.extend(updateLocale);

dayjs.updateLocale("fr", {
  months: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
});

type Props = {
  videos: Video[];
};

const VideosTabs: FC<Props> = (props) => {
  const { videos } = props;
  const trailersVideos =
    videos
      ?.filter((video) => video.type === "Trailer")
      ?.sort((a, b) => b.published_at.localeCompare(a.published_at)) || [];
  const teasersVideos =
    videos
      ?.filter((video) => video.type === "Teaser")
      ?.sort((a, b) => b.published_at.localeCompare(a.published_at)) || [];
  const clipsVideos =
    videos
      ?.filter((video) => video.type === "Clip")
      ?.sort((a, b) => b.published_at.localeCompare(a.published_at)) || [];
  const behindTheScenesVideos =
    videos
      ?.filter((video) => video.type === "Behind the Scenes")
      ?.sort((a, b) => b.published_at.localeCompare(a.published_at)) || [];
  const bloopersVideos =
    videos
      ?.filter((video) => video.type === "Blooper")
      ?.sort((a, b) => b.published_at.localeCompare(a.published_at)) || [];
  const featurettesVideos =
    videos
      ?.filter((video) => video.type === "Featurette")
      ?.sort((a, b) => b.published_at.localeCompare(a.published_at)) || [];

  const tabs = [
    {
      tabTitle: "Bandes-annonces",
      textNoResults: "Aucune bande-annonce disponible",
      videos: trailersVideos,
    },
    {
      tabTitle: "Amorces",
      textNoResults: "Aucune amorce disponible",
      videos: teasersVideos,
    },
    {
      tabTitle: "Extraits",
      textNoResults: "Aucun extrait disponible",
      videos: clipsVideos,
    },
    {
      tabTitle: "Dans les coulisses",
      textNoResults: "Aucune vidéo dans les coulisses disponible",
      videos: behindTheScenesVideos,
    },
    {
      tabTitle: "Bêtisiers",
      textNoResults: "Aucun bêtisier disponible",
      videos: bloopersVideos,
    },
    {
      tabTitle: "Bonus",
      textNoResults: "Aucun bonus disponible",
      videos: featurettesVideos,
    },
  ];

  return (
    <div className="mx-auto grid size-full grid-cols-1 md:w-[90%] md:grid-cols-4 md:flex-row">
      <Tabs
        aria-label="Onglets"
        className="mx-4 md:mx-0"
        variant="bordered"
        classNames={{
          base: "w-full w-[250px]",
          tabList: "flex flex-col items-start justify-evenly",
          tab: "justify-start",
          panel: "col-span-3 w-full p-0",
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            title={
              <div className="my-2 flex items-center space-x-4">
                <span className="text-sm">{tab.tabTitle}</span>
                <Chip className="bg-white text-sm text-primary">
                  {tab.videos.length}
                </Chip>
              </div>
            }
          >
            {tab.videos && tab.videos.length > 0 ? (
              <div className="grid size-full grid-cols-1 gap-2 md:grid-cols-2">
                {tab.videos.map((video) => (
                  <Card
                    key={video.id}
                    classNames={{
                      base: "min-h-[350px] md:h-[450px] bg-primary",
                      body: "justify-start items-start",
                    }}
                  >
                    <CardBody>
                      <iframe
                        className="size-full rounded-lg"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        allowFullScreen
                        title={video.name}
                      />
                      <div className="mt-4 w-full text-center">
                        <h4 className="text-sm font-bold md:text-lg">
                          {video.name}
                        </h4>
                        <p className="mt-2 text-sm md:text-lg">
                          {video?.published_at
                            ? dayjs(video.published_at).format("DD MMMM YYYY")
                            : ""}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="size-full">
                <h4 className="mt-20 text-center text-sm font-bold md:text-lg">
                  {tab.textNoResults}
                </h4>
              </div>
            )}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default VideosTabs;
