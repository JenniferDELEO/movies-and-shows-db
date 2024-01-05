"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FC } from "react";
import Slider from "react-slick";

type Props = {
  popularItems: {
    id: number;
    poster_path: string;
    title?: string;
    name?: string;
  }[];
  popularType: "Films" | "Séries TV";
};

const TopBanner: FC<Props> = ({ popularItems, popularType }) => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const numberOfSlides =
    windowSize[0] >= 1270
      ? 5
      : windowSize[0] >= 768
      ? 3
      : windowSize[0] >= 432
      ? 2
      : 1;

  const settings = {
    dots: true,
    arrows: windowSize[0] >= 768 ? true : false,
    autoplay: false,
    slidesToShow: numberOfSlides,
    slidesToScroll: numberOfSlides,
    appendDots: (dots: any) => (
      <div
        style={{
          backgroundColor: "#ddd",
          borderRadius: "8px",
          padding: "12px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  if (!popularItems) return <div>Chargement...</div>;

  return (
    <div className="w-full mx-auto mb-48">
      <h1 className="text-3xl pl-10 tracking-wide">Top 20 des {popularType}</h1>
      <div className="my-12">
        <Slider {...settings} className="border rounded-t-lg bg-[#ddd]">
          {popularItems.map((item) => (
            <div key={item.id} className="px-4 pt-10 pb-5">
              <Image
                src={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w500/${item.poster_path}`}
                alt={`${item?.title || item?.name} poster`}
                width={342}
                height={513}
              />
              <p className="text-center mt-4 text-gray-800">
                {item?.title || item?.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopBanner;
