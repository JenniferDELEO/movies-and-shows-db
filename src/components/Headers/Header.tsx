"use client";

import Link from "next/link";
import { UserContext } from "@/context/userContext";
import { useRouter, usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { MdLocalMovies, MdPeople } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { IoPersonSharp } from "react-icons/io5";
import { TiHome } from "react-icons/ti";

import {
  getAccountDetails,
  getAccessToken,
  createSessionFromV4,
} from "@/libs/api/auth";
import SearchBar from "@/components/Search/SearchBar";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [requestToken, setRequestToken] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const {
    user: { username, accountIdV3, accountIdV4, sessionId },
    setUser,
  } = useContext(UserContext);

  useEffect(() => {
    setRequestToken(localStorage.getItem("request_token"));

    async function getUserAccount() {
      if (!requestToken) return;
      const responseJsonSession = await getAccessToken(requestToken);

      const responseJsonCreateSession = await createSessionFromV4(
        responseJsonSession.access_token,
      );

      await getAccountDetails(responseJsonCreateSession.session_id);
      window.location.reload();
    }
    if (
      requestToken &&
      !username &&
      !accountIdV3 &&
      !accountIdV4 &&
      !sessionId
    ) {
      getUserAccount();
    }
  }, [
    accountIdV3,
    accountIdV4,
    requestToken,
    router,
    sessionId,
    setUser,
    username,
  ]);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      classNames={{
        base: "bg-primary/90 justify-between",
        wrapper: "lg:max-w-[80%] mx-auto",
        item: [
          "sm:text-xl",
          "data-[active=true]:text-secondary",
          "data-[active=true]:font-normal",
        ],
      }}
    >
      {isSearchOpen ? (
        <NavbarContent>
          <SearchBar
            styleBase="w-full"
            styleContainer=""
            setIsSearchOpen={setIsSearchOpen}
            isHeader={true}
          />
          <button type="button" onClick={() => setIsSearchOpen(false)}>
            <RxCross1 size={18} className="text-xl font-bold" />
          </button>
        </NavbarContent>
      ) : (
        <>
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden"
            />
            <NavbarBrand>
              <Link href="/" className="flex flex-row items-center sm:text-xl">
                <TiHome />
                <span className="ml-2">Accueil</span>
              </Link>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent className="flex gap-4 md:gap-10" justify="end">
            <NavbarItem
              isActive={
                pathname.includes("/movies") || pathname.includes("/movie")
              }
              className="hidden md:block"
            >
              <Link href="/movies/1" className="flex flex-row items-center">
                <MdLocalMovies />
                <span className="ml-2">Films</span>
              </Link>
            </NavbarItem>
            <NavbarItem
              isActive={
                pathname.includes("/tvshows") || pathname.includes("/tvshow")
              }
              className="hidden md:block"
            >
              <Link href="/tvshows/1" className="flex flex-row items-center">
                <PiTelevisionSimpleFill />
                <span className="ml-2">Séries TV</span>
              </Link>
            </NavbarItem>
            <NavbarItem
              isActive={
                pathname.includes("/people") || pathname.includes("/person")
              }
              className="hidden md:block"
            >
              <Link href="/people/1" className="flex flex-row items-center">
                <MdPeople />
                <span className="ml-2">Artistes</span>
              </Link>
            </NavbarItem>
            {!username && !accountIdV3 && !sessionId ? (
              <NavbarItem className="hidden cursor-pointer md:block">
                <div
                  onClick={() => router.replace("/profil/redirection-to-tmdb")}
                >
                  Connexion/Inscription
                </div>
              </NavbarItem>
            ) : (
              <NavbarItem
                isActive={pathname.includes("/profil")}
                className="hidden md:block"
              >
                <Link href="/profil" className="flex flex-row items-center">
                  <IoPersonSharp />
                  <div className="ml-2">
                    <p>{username}</p>
                  </div>
                </Link>
              </NavbarItem>
            )}
            <NavbarItem
              className="cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <FaSearch size={18} />
            </NavbarItem>
          </NavbarContent>
        </>
      )}

      <NavbarMenu className="px-[15%]">
        <NavbarMenuItem
          isActive={pathname.includes("/movies") || pathname.includes("/movie")}
          className="border-b-2 py-4"
        >
          <Link
            href="/movies/1"
            className="flex flex-row items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <MdLocalMovies />
            <span className="ml-2">Films</span>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem
          isActive={
            pathname.includes("/tvshows") || pathname.includes("/tvshow")
          }
          className="border-b-2 py-4"
        >
          <Link
            href="/tvshows/1"
            className="flex flex-row items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <PiTelevisionSimpleFill />
            <span className="ml-2">Séries TV</span>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem
          isActive={
            pathname.includes("/people") || pathname.includes("/person")
          }
          className="border-b-2 py-4"
        >
          <Link
            href="/people/1"
            className="flex flex-row items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <MdPeople />
            <span className="ml-2">Artistes</span>
          </Link>
        </NavbarMenuItem>
        {!username && !accountIdV3 && !sessionId ? (
          <NavbarMenuItem className="border-b-2 py-4">
            <div onClick={() => router.replace("profil/redirection-to-tmdb")}>
              Connexion/Inscription
            </div>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem
            isActive={pathname.includes("/profil")}
            className="border-b-2 py-4"
          >
            <Link
              href="/profil"
              className="flex flex-row items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <IoPersonSharp />
              <div className="ml-2">
                <p>{username}</p>
              </div>
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
