"use client";

import { Image as ImageType } from "@/models/movies";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
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
  title: string;
};

const ImagesWrapper: FC<Props> = ({
  images,
  imageWidth,
  imageHeight,
  classNames,
  title,
}) => {
  return images && images.length > 0 ? (
    <section>
      <h1 className="mb-4 ml-6 font-bold">{title}</h1>
      <div className={classNames.container}>
        {images.map((image) => (
          <Card key={image.file_path} className={classNames.card}>
            <CardBody className="overflow-hidden">
              <picture>
                <img
                  src={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/original${image.file_path}`}
                  alt={image.file_path}
                  width={imageWidth}
                  height={imageHeight}
                  style={{ backgroundPosition: "top", borderRadius: "10px" }}
                />
              </picture>
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
      </div>
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
