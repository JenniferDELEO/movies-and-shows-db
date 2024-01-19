"use client";

import { People } from "@/models/people";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FC } from "react";
import { useRouter } from "next/navigation";

type Props = {
  item: People;
};

const PeopleCard: FC<Props> = ({ item }) => {
  const router = useRouter();
  const knownFor = item?.known_for
    ?.map((item) => item?.title || item?.name)
    .join(", ");
  const slug = item.name.toLowerCase().replace(/ /g, "-");

  return (
    <Card
      isPressable
      className="mb-4 cursor-pointer items-center justify-center bg-white text-primary"
      onPress={() => router.push(`/person/${item.id}/${slug}`)}
    >
      <CardBody className="items-center justify-center">
        <Image
          src={
            item.profile_path
              ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${item.profile_path}`
              : "/images/defaultImage.png"
          }
          width={185}
          alt={item.name}
          className="rounded-xl object-cover"
        />
      </CardBody>
      <CardFooter className="h-[120px] flex-col items-center justify-start px-4 pb-4">
        <h4 className="text-sm md:text-lg">{item.name}</h4>
        <p className="text-xs text-gray-500 md:text-sm">{knownFor}</p>
      </CardFooter>
    </Card>
  );
};

export default PeopleCard;
