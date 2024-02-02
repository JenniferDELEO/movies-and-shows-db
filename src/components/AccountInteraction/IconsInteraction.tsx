"use client";

import { Tooltip } from "@nextui-org/react";
import { FC, Key } from "react";
import { FaListUl, FaBookmark } from "react-icons/fa";
import { FaHeart, FaStar } from "react-icons/fa6";

type Props = {
  item: {
    id: number;
    title?: string;
  };
  handleClick: (item: Key) => Promise<void>;
  isFavorite: boolean;
  isInWatchlist: boolean;
  isRated: boolean;
  userRatingApi: number;
};

const IconsInteraction: FC<Props> = (props) => {
  const {
    item,
    handleClick,
    isFavorite,
    isInWatchlist,
    isRated,
    userRatingApi,
  } = props;

  return (
    <>
      <Tooltip content="Ajouter à une liste" placement="bottom">
        <button
          value={`addToList-${item.id}-${item.title}`}
          onClick={(e) => handleClick(e.currentTarget.value)}
          className="mr-1 rounded-full bg-primary p-3 lg:mr-3"
        >
          <FaListUl size={16} />
        </button>
      </Tooltip>
      <Tooltip content="Marquer comme favoris" placement="bottom">
        <button
          value={`favorite-${item.id}`}
          onClick={(e) => handleClick(e.currentTarget.value)}
          className="mr-1 rounded-full bg-primary p-3 lg:mr-3"
        >
          <FaHeart
            size={16}
            className={`${isFavorite ? "text-red-600" : ""}`}
          />
        </button>
      </Tooltip>
      <Tooltip content="Ajouter à la liste de suivi" placement="bottom">
        <button
          value={`watchlist-${item.id}`}
          onClick={(e) => handleClick(e.currentTarget.value)}
          className="mr-1 rounded-full bg-primary p-3 lg:mr-3"
        >
          <FaBookmark
            size={16}
            className={`${isInWatchlist ? "text-orange-600" : ""}`}
          />
        </button>
      </Tooltip>
      <Tooltip
        content={
          isRated ? `Votre note : ${userRatingApi / 2}` : "Mettre une note"
        }
        placement="bottom"
      >
        <button
          value={`note-${item.id}-${item.title}`}
          onClick={(e) => handleClick(e.currentTarget.value)}
          className="rounded-full bg-primary p-3"
        >
          <FaStar size={16} className={`${isRated ? "text-yellow-400" : ""}`} />
        </button>
      </Tooltip>
    </>
  );
};

export default IconsInteraction;
