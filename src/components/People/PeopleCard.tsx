"use client";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FC } from "react";
import { useRouter } from "next/navigation";

import { CastMovies, CastTvShows, People } from "@/models/people";

type Props = {
  item?: People;
  itemCastAndCrewMovie?: CastMovies;
  itemCastAndCrewTvShow?: CastTvShows;
};

const PeopleCard: FC<Props> = ({
  item,
  itemCastAndCrewMovie,
  itemCastAndCrewTvShow,
}) => {
  const router = useRouter();
  const knownFor = item?.known_for?.map((item) => item?.title).join(", ");
  const slug =
    item?.name.toLowerCase().replace(/[\W_]+/g, "-") ||
    itemCastAndCrewMovie?.name.toLowerCase().replace(/[\W_]+/g, "-") ||
    itemCastAndCrewTvShow?.name.toLowerCase().replace(/[\W_]+/g, "-");
  const id = item?.id || itemCastAndCrewMovie?.id || itemCastAndCrewTvShow?.id;
  const profilePath =
    item?.profile_path ||
    itemCastAndCrewMovie?.profile_path ||
    itemCastAndCrewTvShow?.profile_path;
  const name =
    item?.name || itemCastAndCrewMovie?.name || itemCastAndCrewTvShow?.name;
  const character =
    itemCastAndCrewMovie?.character ||
    itemCastAndCrewTvShow?.roles?.[0]?.character;
  const episodeCount = itemCastAndCrewTvShow?.roles?.[0].episode_count;

  return (
    <Card
      isPressable
      className="mb-4 cursor-pointer items-center justify-center bg-white text-primary"
      onPress={() => router.push(`/person/${id}/${slug}`)}
    >
      <CardBody className="items-center justify-center">
        <Image
          src={
            profilePath
              ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${profilePath}`
              : "/images/defaultImage.png"
          }
          width={185}
          alt={name}
          className="rounded-xl object-cover"
          style={{
            maxHeight: itemCastAndCrewMovie
              ? 168
              : itemCastAndCrewTvShow
                ? 145
                : 278,
          }}
        />
      </CardBody>
      <CardFooter
        className="flex-col items-center justify-start px-4 pb-4"
        style={{
          height: itemCastAndCrewTvShow ? 140 : 120,
        }}
      >
        <h4 className="text-sm">{name}</h4>
        {knownFor && <p className="text-xs text-gray-500">{knownFor}</p>}
        {character && <p className="text-xs text-gray-500">{character}</p>}
        {episodeCount && (
          <p className="text-xs text-gray-500">{episodeCount} épisodes</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default PeopleCard;
