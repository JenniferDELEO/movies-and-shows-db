"use client";

import { Cast, People } from "@/models/people";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FC } from "react";
import { useRouter } from "next/navigation";

type Props = {
  item?: People;
  itemCastAndCrew?: Cast;
};

const PeopleCard: FC<Props> = ({ item, itemCastAndCrew }) => {
  const router = useRouter();
  const knownFor = item?.known_for
    ?.map((item) => item?.title || item?.name)
    .join(", ");
  const slug =
    item?.name.toLowerCase().replace(/ /g, "-") ||
    itemCastAndCrew?.name.toLowerCase().replace(/ /g, "-");
  const id = item?.id || itemCastAndCrew?.id;
  const profilePath = item?.profile_path || itemCastAndCrew?.profile_path;
  const name = item?.name || itemCastAndCrew?.name;
  const character = itemCastAndCrew?.character;

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
          style={{ maxHeight: itemCastAndCrew ? 168 : "auto" }}
        />
      </CardBody>
      <CardFooter className="h-[120px] flex-col items-center justify-start px-4 pb-4">
        <h4 className="text-sm">{name}</h4>
        {knownFor && (
          <p className="text-xs text-gray-500 md:text-sm">{knownFor}</p>
        )}
        {character && (
          <p className="text-xs text-gray-500 md:text-sm">{character}</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default PeopleCard;
