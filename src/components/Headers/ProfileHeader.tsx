"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { FaListUl, FaStar, FaHeart } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";

import { InternalUserContext } from "@/context/internalUserContext";

const ProfileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    internalUser: { user_name, user_image },
  } = useContext(InternalUserContext);
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(31.5, 10.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 10.5, 10.5, 0.84) 50%, rgba(31.5, 10.5, 10.5, 0.84) 100%)",
        height: "120px",
        width: "100vw",
        position: "fixed",
        top: 64,
        zIndex: 30,
      }}
    >
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        classNames={{
          base: `justify-center bg-primary h-[120px]`,
          wrapper: "max-w-[1250px] mx-auto justify-center",
          item: ["text-sm lg:text-xl mr-2 hover:underline"],
        }}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden"
          />
          <NavbarBrand>
            <Link href="/" className="flex flex-row items-center">
              <div
                style={{
                  width: "58px",
                  minWidth: "58px",
                  height: "58px",
                  minHeight: "58px",
                }}
                className="overflow-hidden rounded-full bg-white"
              >
                <picture>
                  <img
                    alt="profile"
                    src={user_image ? user_image : "/images/defaultProfile.png"}
                    width="100%"
                    height="100%"
                    className="rounded-full"
                  />
                </picture>
              </div>
              <div className="ml-4 flex flex-col items-start justify-start">
                <p className="text-sm lg:text-lg">{user_name}</p>
                <p className="pt-2 text-xs text-gray-400 md:text-sm">
                  Mon profil
                </p>
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="flex" justify="start">
          <NavbarItem className="hidden md:block">
            <Link href="/profile/lists" className="flex flex-row items-center">
              <FaListUl />
              <span className="ml-2 text-sm lg:text-lg">Mes listes</span>
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden md:block">
            <Link href="/profile/notes" className="flex flex-row items-center">
              <FaStar />
              <span className="ml-2 text-sm lg:text-lg">Mes notes</span>
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden md:block">
            <Link
              href="/profile/favorites"
              className="flex flex-row items-center"
            >
              <FaHeart />
              <span className="ml-2 text-sm lg:text-lg">Mes favoris</span>
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden md:block">
            <Link href="/profile/movies" className="flex flex-row items-center">
              <MdLocalMovies />
              <span className="ml-2 text-sm lg:text-lg">Mes Films</span>
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden md:block">
            <Link
              href="/profile/tvshows"
              className="flex flex-row items-center"
            >
              <PiTelevisionSimpleFill />
              <span className="ml-2 text-sm lg:text-lg">Mes Séries TV</span>
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className="mt-[120px] flex flex-col bg-primary">
          <NavbarMenuItem className="ml-2">
            <Link
              href="/profile/lists"
              onClick={() => setIsMenuOpen(false)}
              className="flex flex-row items-center"
            >
              <FaListUl />
              <span className="ml-2 text-sm lg:text-lg">Mes listes</span>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem className="ml-2 mt-4">
            <Link
              href="/profile/notes"
              onClick={() => setIsMenuOpen(false)}
              className="flex flex-row items-center"
            >
              <FaStar />
              <span className="ml-2 text-sm lg:text-lg">Mes notes</span>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem className="ml-2 mt-4 border-b-2 pb-4">
            <Link
              href="/profile/favorites"
              onClick={() => setIsMenuOpen(false)}
              className="flex flex-row items-center"
            >
              <FaHeart />
              <span className="ml-2 text-sm lg:text-lg">Mes favoris</span>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem className="ml-2 mt-4">
            <Link
              href="/profile/movies"
              onClick={() => setIsMenuOpen(false)}
              className="flex flex-row items-center"
            >
              <MdLocalMovies />
              <span className="ml-2 text-sm lg:text-lg">Mes Films</span>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem className="ml-2 mt-4">
            <Link
              href="/profile/tvshows"
              onClick={() => setIsMenuOpen(false)}
              className="flex flex-row items-center"
            >
              <PiTelevisionSimpleFill />
              <span className="ml-2 text-sm lg:text-lg">Mes Séries TV</span>
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </div>
  );
};

export default ProfileHeader;
