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
import { useState } from "react";
import { FaListUl, FaStar, FaHeart } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";

import { useSession } from "next-auth/react";

const ProfileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = useSession();

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      classNames={{
        base: "fixed top-[64px] bg-white/90 justify-center z-30",
        wrapper: "max-w-[1250px] mx-auto justify-center",
        item: ["text-sm text-primary lg:text-xl mr-2 hover:underline"],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <Link href="/profile" className="flex flex-row items-center">
            <div
              style={{
                width: "48px",
                minWidth: "48px",
                height: "48px",
                minHeight: "48px",
              }}
              className="overflow-hidden rounded-full bg-white"
            >
              <picture>
                <img
                  alt="profile"
                  src={
                    session?.user?.image
                      ? session.user.image
                      : "/images/defaultProfile.png"
                  }
                  width="100%"
                  height="100%"
                  className="rounded-full"
                />
              </picture>
            </div>
            <div className="ml-4 flex flex-col items-start justify-start">
              <p className="text-sm text-primary lg:text-lg">
                {session?.user?.name}
              </p>
              <p className="pt-2 text-xs text-gray-600 md:text-sm">
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
          <Link href="/profile/tvs" className="flex flex-row items-center">
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
            href="/profile/tvs"
            onClick={() => setIsMenuOpen(false)}
            className="flex flex-row items-center"
          >
            <PiTelevisionSimpleFill />
            <span className="ml-2 text-sm lg:text-lg">Mes Séries TV</span>
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default ProfileHeader;
