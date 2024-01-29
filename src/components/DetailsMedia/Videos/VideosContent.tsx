"use client";

import { FC, useState } from "react";
import { Video } from "@/models/movies";
import { Card, CardBody, Chip, Tab, Tabs } from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import updateLocale from "dayjs/plugin/updateLocale";

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

const VideosContent: FC<Props> = (props) => {
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

  return (
    <div className="mx-auto flex w-full flex-col md:w-[90%]">
      <Tabs
        aria-label="Onglets"
        className="mx-4 md:mx-0"
        variant="light"
        color="primary"
        classNames={{
          tabContent: "p-4",
        }}
      >
        <Tab
          key="Bandes-annonces"
          title={
            <div className="my-2 flex items-center space-x-2">
              <span className="text-sm">Bandes-annonces</span>
              <Chip className="bg-white text-sm text-primary">
                {trailersVideos.length}
              </Chip>
            </div>
          }
        >
          <div className="mx-auto my-4 grid grid-cols-1 gap-2 md:grid-cols-2">
            {trailersVideos && trailersVideos.length > 0 ? (
              trailersVideos.map((video) => (
                <Card
                  key={video.id}
                  classNames={{
                    base: "min-h-[350px]",
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
                    <div className="mt-4">
                      <h4 className="text-center text-sm font-bold md:text-lg">
                        {video.name}
                      </h4>
                      <p className="mt-2 text-center text-sm md:text-lg">
                        {video?.published_at
                          ? dayjs(video.published_at).format("DD MMMM YYYY")
                          : ""}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))
            ) : (
              <div>
                <h4 className="text-center text-sm font-bold md:text-lg">
                  Aucune bande-annonce disponible
                </h4>
              </div>
            )}
          </div>
        </Tab>
        <Tab
          key="Amorces"
          title={
            <div className="my-2 flex items-center space-x-2">
              <span className=" text-sm">Amorces</span>
              <Chip className="bg-white text-sm text-primary">
                {teasersVideos.length}
              </Chip>
            </div>
          }
        >
          <div className="mx-auto my-4 grid grid-cols-1 gap-2 md:grid-cols-2">
            {teasersVideos && teasersVideos.length > 0 ? (
              teasersVideos.map((video) => (
                <Card
                  key={video.id}
                  classNames={{
                    base: "min-h-[350px]",
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
                    <div className="mt-4">
                      <h4 className="text-center text-sm font-bold md:text-lg">
                        {video.name}
                      </h4>
                      <p className="mt-2 text-center text-sm md:text-lg">
                        {video?.published_at
                          ? dayjs(video.published_at).format("DD MMMM YYYY")
                          : ""}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))
            ) : (
              <div>
                <h4 className="text-center text-sm font-bold md:text-lg">
                  Aucune amorce disponible
                </h4>
              </div>
            )}
          </div>
        </Tab>
        <Tab
          key="Extraits"
          title={
            <div className="my-2 flex items-center space-x-2">
              <span className=" text-sm">Extraits</span>
              <Chip className="bg-white text-sm text-primary">
                {clipsVideos.length}
              </Chip>
            </div>
          }
        >
          <div className="mx-auto my-4 grid grid-cols-1 gap-2 md:grid-cols-2">
            {clipsVideos && clipsVideos.length > 0 ? (
              clipsVideos.map((video) => (
                <Card
                  key={video.id}
                  classNames={{
                    base: "min-h-[350px]",
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
                    <div className="mt-4">
                      <h4 className="text-center text-sm font-bold md:text-lg">
                        {video.name}
                      </h4>
                      <p className="mt-2 text-center text-sm md:text-lg">
                        {video?.published_at
                          ? dayjs(video.published_at).format("DD MMMM YYYY")
                          : ""}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))
            ) : (
              <div>
                <h4 className="text-center text-sm font-bold md:text-lg">
                  Aucun extrait disponible
                </h4>
              </div>
            )}
          </div>
        </Tab>
        <Tab
          key="Dans les coulisses"
          title={
            <div className="my-2 flex items-center space-x-2">
              <span className=" text-sm">Dans les coulisses</span>
              <Chip className="bg-white text-sm text-primary">
                {behindTheScenesVideos.length}
              </Chip>
            </div>
          }
        >
          <div className="mx-auto my-4 grid grid-cols-1 gap-2 md:grid-cols-2">
            {behindTheScenesVideos && behindTheScenesVideos.length > 0 ? (
              behindTheScenesVideos.map((video) => (
                <Card
                  key={video.id}
                  classNames={{
                    base: "min-h-[350px]",
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
                    <div className="mt-4">
                      <h4 className="text-center text-sm font-bold md:text-lg">
                        {video.name}
                      </h4>
                      <p className="mt-2 text-center text-sm md:text-lg">
                        {video?.published_at
                          ? dayjs(video.published_at).format("DD MMMM YYYY")
                          : ""}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))
            ) : (
              <div>
                <h4 className="text-center text-sm font-bold md:text-lg">
                  Aucune vidéo dans les coulisses disponible
                </h4>
              </div>
            )}
          </div>
        </Tab>
        <Tab
          key="Betisiers"
          title={
            <div className="my-2 flex items-center space-x-2">
              <span className=" text-sm">Bêtisiers</span>
              <Chip className="bg-white text-sm text-primary">
                {bloopersVideos.length}
              </Chip>
            </div>
          }
        >
          <div className="mx-auto my-4 grid grid-cols-1 gap-2 md:grid-cols-2">
            {bloopersVideos && bloopersVideos.length > 0 ? (
              bloopersVideos.map((video) => (
                <Card
                  key={video.id}
                  classNames={{
                    base: "min-h-[350px]",
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
                    <div className="mt-4">
                      <h4 className="text-center text-sm font-bold md:text-lg">
                        {video.name}
                      </h4>
                      <p className="mt-2 text-center text-sm md:text-lg">
                        {video?.published_at
                          ? dayjs(video.published_at).format("DD MMMM YYYY")
                          : ""}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))
            ) : (
              <div>
                <h4 className="text-center text-sm font-bold md:text-lg">
                  Aucun bêtisier disponible
                </h4>
              </div>
            )}
          </div>
        </Tab>
        <Tab
          key="Bonus"
          title={
            <div className="my-2 flex items-center space-x-2">
              <span className=" text-sm">Bonus</span>
              <Chip className="bg-white text-sm text-primary">
                {featurettesVideos.length}
              </Chip>
            </div>
          }
        >
          <div className="mx-auto my-4 grid grid-cols-1 gap-2 md:grid-cols-2">
            {featurettesVideos && featurettesVideos.length > 0 ? (
              featurettesVideos.map((video) => (
                <Card
                  key={video.id}
                  classNames={{
                    base: "min-h-[350px]",
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
                    <div className="mt-4">
                      <h4 className="text-center text-sm font-bold md:text-lg">
                        {video.name}
                      </h4>
                      <p>
                        {video?.published_at
                          ? dayjs(video.published_at).format("DD MMMM YYYY")
                          : ""}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))
            ) : (
              <div>
                <h4 className="text-center text-sm font-bold md:text-lg">
                  Aucun bonus disponible
                </h4>
              </div>
            )}
          </div>
        </Tab>{" "}
      </Tabs>
    </div>
  );
};

export default VideosContent;
