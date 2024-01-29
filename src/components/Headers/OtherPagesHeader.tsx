"use client";

import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import dayjs from "dayjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

type Props = {
  backdropPath: string;
  date: string;
  posterPath: string;
  title: string;
};

const OtherPagesHeader: FC<Props> = (props) => {
  const { backdropPath, date, posterPath, title } = props;
  const pathname = usePathname();
  const router = useRouter();

  const oldPathname = pathname.split("/");
  const newPathname = oldPathname.slice(0, 3).join("/");

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w1280${backdropPath})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "10px",
        width: "100vw",
        position: "fixed",
        top: "128px",
        zIndex: 30,
      }}
    >
      <Navbar
        classNames={{
          base: `justify-center z-30 bg-primary/80 h-[120px]`,
          wrapper: "lg:max-w-[90%] mx-auto justify-center",
          item: ["sm:text-xl mr-2"],
        }}
      >
        <NavbarContent className="flex" justify="start">
          <NavbarItem>
            <div
              style={{
                width: "58px",
                minWidth: "58px",
                height: "87px",
                minHeight: "87px",
              }}
              className="overflow-hidden rounded-lg"
            >
              <Image
                alt={`poster-${title}`}
                src={
                  posterPath
                    ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${posterPath}`
                    : "/images/defaultImage.png"
                }
                width={0}
                height={0}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  minWidth: "100%",
                  minHeight: "100%",
                  borderWidth: 0,
                  outline: 0,
                }}
                sizes="100vw"
                onClick={() => router.push(`${newPathname}`)}
              />
            </div>
          </NavbarItem>
          <NavbarItem>
            <div className="flex flex-col">
              <h1 className="text-wrap text-lg font-bold md:text-2xl">
                {title}{" "}
                <span className="font-normal text-gray-400">
                  ({date ? dayjs(date).format("YYYY") : "Non sorti"})
                </span>
              </h1>
              <button
                className="mt-2 flex flex-row items-center justify-start"
                onClick={() => router.push(`${newPathname}`)}
              >
                <FaLongArrowAltLeft className="mr-2" />
                <p className="text-sm md:text-lg">
                  Retour à la page principale
                </p>
              </button>
            </div>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default OtherPagesHeader;
