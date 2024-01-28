"use client";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FC } from "react";
import { useRouter } from "next/navigation";

import { CastMovies, CastTvShows, People } from "@/models/people";

type Props = {
  item?: People;
  itemCastMovie?: CastMovies;
  itemCastTvShow?: CastTvShows;
};

const PeopleCard: FC<Props> = ({ item, itemCastMovie, itemCastTvShow }) => {
  const router = useRouter();
  const knownFor = item?.known_for?.map((item) => item?.title).join(", ");
  const slug =
    item?.name.toLowerCase().replace(/[\W_]+/g, "-") ||
    itemCastMovie?.name.toLowerCase().replace(/[\W_]+/g, "-") ||
    itemCastTvShow?.name.toLowerCase().replace(/[\W_]+/g, "-");
  const id = item?.id || itemCastMovie?.id || itemCastTvShow?.id;
  const profilePath =
    item?.profile_path ||
    itemCastMovie?.profile_path ||
    itemCastTvShow?.profile_path;
  const name = item?.name || itemCastMovie?.name || itemCastTvShow?.name;
  const character =
    itemCastMovie?.character || itemCastTvShow?.roles?.[0]?.character;
  const episodeCount = itemCastTvShow?.roles?.[0].episode_count;

  return (
    <Card
      isPressable
      className="mb-4 cursor-pointer items-center justify-center"
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
            maxHeight: itemCastMovie ? 168 : itemCastTvShow ? 145 : 278,
          }}
        />
      </CardBody>
      <CardFooter
        className="flex-col items-center justify-start px-4 pb-4"
        style={{
          height: itemCastTvShow ? 140 : 120,
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
