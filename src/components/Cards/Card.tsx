"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { FC } from "react";
import { useRouter } from "next/navigation";

import StarRating from "@/components/StarRate/StarRating";

type Props = {
  item: any;
  filterType: string;
  genres: {
    id: number;
    name: string;
  }[];
};

const Card: FC<Props> = ({ item, filterType, genres }) => {
  const router = useRouter();

  const overviewRest = item?.overview?.split(" ")?.filter(Boolean);
  const overviewShow = overviewRest?.splice(0, 30)?.join(" ");

  const title = filterType === "movie" ? item.title : item.name;
  const date = filterType === "movie" ? item.release_date : item.first_air_date;

  const styleContainer =
    "mb-4 2xl:mb-0 flex max-h-[278px] mx-auto lg:mx-4 pr-4 bg-gray-900 rounded-md cursor-pointer";

  return (
    <div
      className={styleContainer}
      onClick={() =>
        router.push(
          `/${filterType === "movie" ? "movie" : "tvshow"}/${item.id}-${(item?.title || item?.name)?.toLowerCase().replace(/[\W_]+/g, "-")}`,
        )
      }
    >
      <Image
        src={
          item.poster_path
            ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${item.poster_path}`
            : "/images/defaultImage.png"
        }
        alt={title}
        width={0}
        height={0}
        style={{ width: 185, height: 278, borderRadius: 5 }}
        sizes="100vw"
      />
      <div className="ml-4">
        <h3 className="pb-2 pt-4 text-base md:text-xl">{title}</h3>
        <p className="text-xs text-gray-400 md:text-sm">
          {item.genre_ids.map((genreId: number) => {
            const genre = genres.find((genre) => genre.id === genreId);
            return <span key={genreId}>{genre?.name} </span>;
          })}
        </p>
        <div className="flex flex-row items-center justify-start pb-2">
          <p className="text-xs text-gray-400 md:text-sm">
            {date?.length ? dayjs(date).format("DD MMM. YYYY") : ""}
          </p>
          <div className={`flex items-center justify-between `}>
            <StarRating
              value={item.vote_average / 2}
              count={5}
              size={14}
              isHalf={true}
              edit={false}
            />
            <span className="ml-1 text-xs text-gray-500">
              ({item.vote_count} vote{item.vote_count > 1 ? "s" : ""})
            </span>
          </div>
        </div>
        <p className="text-xs md:text-justify md:text-sm">
          {overviewShow}
          {overviewRest.length ? "..." : ""}
        </p>
      </div>
    </div>
  );
};

export default Card;
