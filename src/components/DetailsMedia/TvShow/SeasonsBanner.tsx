"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Dispatch, FC, SetStateAction } from "react";

import StarRating from "@/components/StarRate/StarRating";
import { Season } from "@/models/tvShows";
import ScrollLink from "@/components/ScrollLink/ScrollLink";

type Props = {
  seasons: Season[];
  selectedSeason: Season;
  setSelectedSeason: Dispatch<SetStateAction<Season>>;
};

const SeasonsBanner: FC<Props> = (props) => {
  const { seasons, selectedSeason, setSelectedSeason } = props;

  return (
    <>
      <h1 className="mx-auto py-4 text-xl font-bold md:w-[90%]">
        Saisons ({seasons.filter((season) => season.season_number !== 0).length}
        )
      </h1>
      <div className="mx-auto flex size-full flex-row items-baseline justify-start overflow-x-auto md:w-[93%]">
        {seasons.length > 0 &&
          seasons.map((season) => (
            <div key={season.id} className="mx-2 my-4">
              <ScrollLink href="#episode-section">
                <Card
                  isPressable
                  className="mx-2 my-4 flex cursor-pointer flex-col items-center justify-center bg-transparent"
                  onPress={() => setSelectedSeason(season)}
                >
                  <CardBody
                    className="flex flex-col items-center justify-center"
                    style={{
                      width: 150,
                      height: 215,
                    }}
                  >
                    <picture>
                      <img
                        alt={`poster de la saison ${season.season_number}`}
                        src={
                          season?.poster_path
                            ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w342${season.poster_path}`
                            : "/images/defaultImage.png"
                        }
                        width={0}
                        height={0}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 5,
                          boxShadow:
                            selectedSeason.id === season.id
                              ? "0 0 10px #fff"
                              : "",
                        }}
                        sizes="100vw"
                      />
                    </picture>
                  </CardBody>
                  <CardFooter className="h-[120px] flex-col items-center justify-start px-4 pb-4">
                    <h4 className="text-sm">Saison {season.season_number}</h4>
                    <p className="py-2 text-gray-400">
                      {season.episode_count} épisodes
                    </p>
                    <StarRating
                      count={5}
                      value={season.vote_average / 2}
                      edit={false}
                      size={12}
                    />
                  </CardFooter>
                </Card>
              </ScrollLink>
            </div>
          ))}
      </div>
    </>
  );
};

export default SeasonsBanner;
