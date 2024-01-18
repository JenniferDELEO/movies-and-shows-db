import { People } from "@/models/people";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import React, { FC } from "react";

type Props = {
  item: People;
};

const PeopleCard: FC<Props> = ({ item }) => {
  const knownFor = item?.known_for
    ?.map((item) => item?.title || item?.name)
    .join(", ");

  return (
    <Card className="mb-4 items-center justify-center bg-white text-primary">
      <CardBody className="items-center justify-center">
        <Image
          src={
            item.profile_path
              ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w342${item.profile_path}`
              : "/images/defaultImage.png"
          }
          width={342}
          alt={item.name}
          className="rounded-xl object-cover"
        />
      </CardBody>
      <CardFooter className="flex-col items-start justify-start px-4 pb-4">
        <h4 className="text-sm md:text-lg">{item.name}</h4>
        <p className="text-xs md:text-sm">{knownFor}</p>
      </CardFooter>
    </Card>
  );
};

export default PeopleCard;
