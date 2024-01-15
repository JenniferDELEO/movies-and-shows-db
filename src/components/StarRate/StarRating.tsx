import React, { Dispatch, FC, SetStateAction } from "react";

type Props = {
  userRate: number;
  setUserRate: Dispatch<SetStateAction<number>>;
};

const StarRating: FC<Props> = ({ userRate, setUserRate }) => {
  return (
    <div className="flex h-9 items-center">
      {Array.from({ length: userRate }).map((_, i) => (
        <span
          key={i}
          onClick={() => setUserRate(i + 1)}
          className="cursor-pointer text-xl text-yellow-500"
        >
          &#9733;
        </span>
      ))}
      {Array.from({ length: 5 - userRate }).map((_, i) => (
        <span
          key={i + userRate}
          onClick={() => setUserRate(i + userRate + 1)}
          className="cursor-pointer text-xl text-gray-500"
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
