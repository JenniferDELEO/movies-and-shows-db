import { FC } from "react";

type Props = {
  averageRate: number;
  countRate: number;
  className: string;
};

const StarRateAverage: FC<Props> = ({ averageRate, countRate, className }) => {
  const displayRate = (Math.round(averageRate * 10) / 20).toFixed(1);
  const numberRate = parseFloat(displayRate);
  return (
    <div className={className}>
      {numberRate !== 0 ? (
        <div className="flex items-center">
          {Array.from({ length: Math.floor(numberRate) }).map((_, i) => (
            <span key={i} className="text-yellow-500">
              &#9733;
            </span>
          ))}
          {Array.from({ length: 5 - Math.floor(numberRate) }).map((_, i) => (
            <span key={i + numberRate} className="text-gray-500">
              &#9733;
            </span>
          ))}
          <span className="text-gray-500 text-xs ml-1">
            ({countRate} vote{countRate > 1 ? "s" : ""})
          </span>
        </div>
      ) : (
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-gray-500">
              &#9734;
            </span>
          ))}
          <span className="text-gray-500 text-xs ml-1">({countRate} vote)</span>
        </div>
      )}
    </div>
  );
};

export default StarRateAverage;
