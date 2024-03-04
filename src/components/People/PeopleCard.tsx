"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { FC } from "react";
import { useRouter } from "next/navigation";

import { CastMovies, CastTvs, People } from "@/models/people";

type Props = {
  item?: People;
  itemCastMovie?: CastMovies;
  itemCastTv?: CastTvs;
};

const PeopleCard: FC<Props> = ({ item, itemCastMovie, itemCastTv }) => {
  const router = useRouter();
  const knownFor = item?.known_for
    ?.map((item) => item?.title || item?.name)
    .join(", ");
  const slug =
    item?.name.toLowerCase().replace(/[\W_]+/g, "-") ||
    itemCastMovie?.name.toLowerCase().replace(/[\W_]+/g, "-") ||
    itemCastTv?.name.toLowerCase().replace(/[\W_]+/g, "-");
  const id = item?.id || itemCastMovie?.id || itemCastTv?.id;
  const profilePath =
    item?.profile_path ||
    itemCastMovie?.profile_path ||
    itemCastTv?.profile_path;
  const name = item?.name || itemCastMovie?.name || itemCastTv?.name;
  const character =
    itemCastMovie?.character || itemCastTv?.roles?.[0]?.character;
  const episodeCount = itemCastTv?.roles?.[0].episode_count;

  return (
    <Card
      isPressable
      className="mb-4 cursor-pointer items-center justify-center bg-primary"
      onPress={() => router.push(`/person/${id}/${slug}`)}
    >
      <CardBody className="items-center justify-center">
        <picture>
          <img
            src={
              profilePath
                ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${profilePath}`
                : "/images/defaultImage.png"
            }
            width={185}
            alt={name}
            className="rounded-xl object-cover"
            style={{
              maxHeight: itemCastMovie ? 168 : itemCastTv ? 145 : 278,
            }}
          />
        </picture>
      </CardBody>
      <CardFooter
        className="flex-col items-center justify-start px-4 pb-4"
        style={{
          height: itemCastTv ? 140 : 120,
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
