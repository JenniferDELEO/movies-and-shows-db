"use client";

import { Image as ImageType } from "@/models/movies";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  images: ImageType[];
  imageWidth: number;
  imageHeight: number;
  classNames: {
    container: string;
    card: string;
    cardFooter: string;
  };
};

const ImagesWrapper: FC<Props> = ({
  images,
  imageWidth,
  imageHeight,
  classNames,
}) => {
  return images && images.length > 0 ? (
    <section className={classNames.container}>
      {images.map((image) => (
        <Card key={image.file_path} className={classNames.card}>
          <CardBody className="overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/original${image.file_path}`}
              alt={image.file_path}
              width={imageWidth}
              height={imageHeight}
              layout="responsive"
              style={{ backgroundPosition: "top", borderRadius: "10px" }}
            />
          </CardBody>
          <CardFooter className={classNames.cardFooter}>
            <p className="pt-2">Définition (en pixels)</p>
            <p className="pt-2">
              Format : {image.file_path.split(".")[1].toUpperCase()}
            </p>
            <Link
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/original${image.file_path}`}
              className="pt-2 hover:underline"
            >
              {image.width}x{image.height}
            </Link>
          </CardFooter>
        </Card>
      ))}
    </section>
  ) : (
    <section>
      <p className="mx-auto mb-4 py-4 text-lg md:w-[90%] lg:px-4">
        Aucune image disponible
      </p>
    </section>
  );
};

export default ImagesWrapper;
