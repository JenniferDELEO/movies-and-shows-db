"use client";

import Link from "next/link";
import { UserContext } from "@/context/userContext";
import { useRouter, usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { MdLocalMovies, MdPeople } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { IoPersonSharp } from "react-icons/io5";
import { TiHome } from "react-icons/ti";

import { getAccountDetails } from "@/libs/api/user";
import { getAccessToken, createSessionFromV4 } from "@/libs/api/auth";
import SearchBar from "@/components/Search/SearchBar";
import toast from "react-hot-toast";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [requestToken, setRequestToken] = useState<string | null>(null);
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

  const handleLogOut = () => {
    localStorage.removeItem("gravatar_hash");
    localStorage.removeItem("account_id_v4");
    localStorage.removeItem("session_id");
    localStorage.removeItem("username");
    localStorage.removeItem("tmdb_avatar_path");
    localStorage.removeItem("account_username");
    localStorage.removeItem("access_token");
    localStorage.removeItem("account_id_v3");
    setUser({
      username: null,
      accountIdV3: null,
      accountIdV4: null,
      sessionId: null,
    });
    toast.success("Vous êtes déconnecté");
    router.replace("/");
  };

  return (
    <Navbar
      classNames={{
        base: "bg-primary/90 justify-between",
        wrapper: "max-w-[1250px] mx-auto justify-center",
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
            <Link href="/" className="flex flex-row items-center sm:text-xl">
              <TiHome />
              <span className="ml-2 hidden text-sm md:block lg:text-lg">
                Accueil
              </span>
            </Link>
          </NavbarContent>
          <NavbarContent
            className="flex gap-0 sm:gap-4 md:gap-10"
            justify="end"
          >
            <Dropdown>
              <NavbarItem
                isActive={
                  pathname.includes("/movies") || pathname.includes("/movie")
                }
              >
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                    endContent={<FaChevronDown className="hidden md:block" />}
                    radius="sm"
                    variant="light"
                  >
                    <MdLocalMovies />
                    <span className="ml-2 hidden text-sm md:block lg:text-lg">
                      Films
                    </span>
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="Films"
                classNames={{
                  base: "bg-primary border-primary border-2 rounded-lg shadow-primary outline-none",
                }}
              >
                <DropdownItem href="/movies/1" textValue="Liste">
                  <span>Liste</span>
                </DropdownItem>
                <DropdownItem
                  href="/movies/now-playing/1"
                  textValue="Actuellement au cinéma"
                >
                  <span>Actuellement au cinéma</span>
                </DropdownItem>
                <DropdownItem href="/movies/upcoming/1" textValue="À venir">
                  <span>À venir</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <NavbarItem
                isActive={
                  pathname.includes("/tvshows") || pathname.includes("/tvshow")
                }
              >
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                    endContent={<FaChevronDown className="hidden md:block" />}
                    radius="sm"
                    variant="light"
                  >
                    <PiTelevisionSimpleFill />
                    <span className="ml-2 hidden text-sm md:block lg:text-lg">
                      Séries TV
                    </span>
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="Séries TV"
                classNames={{
                  base: "bg-primary border-primary border-2 rounded-lg shadow-primary outline-none",
                }}
              >
                <DropdownItem href="/tvshows/1" textValue="Liste">
                  <span>Liste</span>
                </DropdownItem>
                <DropdownItem
                  href="/tvshows/on-the-air/1"
                  textValue="En cours de diffusion"
                >
                  <span>En cours de diffusion</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <NavbarItem
              isActive={
                pathname.includes("/people") || pathname.includes("/person")
              }
            >
              <Button
                disableRipple
                className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                <Link href="/people/1" className="flex flex-row items-center">
                  <MdPeople />
                  <span className="ml-2 hidden text-sm md:block lg:text-lg">
                    Artistes
                  </span>
                </Link>
              </Button>
            </NavbarItem>
            {!username && !accountIdV3 && !sessionId ? (
              <NavbarItem className="ml-2 hidden cursor-pointer text-sm md:block lg:text-lg">
                <div
                  onClick={() => router.replace("/profil/redirection-to-tmdb")}
                >
                  Connexion/Inscription
                </div>
              </NavbarItem>
            ) : (
              <Dropdown>
                <NavbarItem isActive={pathname.includes("/profile")}>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                      endContent={<FaChevronDown className="hidden md:block" />}
                      radius="sm"
                      variant="light"
                    >
                      <IoPersonSharp />
                      <span className="ml-2 hidden text-sm md:block lg:text-lg">
                        {username}
                      </span>
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  aria-label="Profil"
                  classNames={{
                    base: "bg-primary border-primary border-2 rounded-lg shadow-primary outline-none",
                  }}
                >
                  <DropdownSection showDivider>
                    <DropdownItem href="/profile" textValue="Mon profil">
                      <div className="flex flex-col">
                        <span className="font-bold">{username}</span>
                        <span className="pt-2">Mon profil</span>
                      </div>
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection>
                    {/* <DropdownItem href="/profile/settings">
                      <span className="pt-2">Paramètres</span>
                    </DropdownItem> */}
                    <DropdownItem
                      onPress={handleLogOut}
                      textValue="Déconnexion"
                    >
                      <span className="pt-2 text-gray-400">Déconnexion</span>
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
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

      {/* <NavbarMenu className="bg-primary/90 px-[15%]">
        <Accordion itemClasses={{ content: "flex flex-col" }}>
          <AccordionItem
            key="movies"
            aria-label="Movies"
            title={
              <NavbarMenuItem
                isActive={
                  pathname.includes("/movies") || pathname.includes("/movie")
                }
                className="flex flex-row items-center border-b-2 py-4"
              >
                <MdLocalMovies />
                <span className="ml-2">Films</span>
              </NavbarMenuItem>
            }
          >
            <Link
              className="ml-2"
              href="/movies/1"
              onClick={() => setIsMenuOpen(false)}
            >
              Liste
            </Link>
            <Link
              className="ml-2 mt-4"
              href="/movies/now-playing/1"
              onClick={() => setIsMenuOpen(false)}
            >
              Actuellement au cinéma
            </Link>
            <Link
              className="ml-2 mt-4"
              href="/movies/upcoming/1"
              onClick={() => setIsMenuOpen(false)}
            >
              À venir
            </Link>
          </AccordionItem>
        </Accordion>
        <Accordion itemClasses={{ content: "flex flex-col" }}>
          <AccordionItem
            key="tvshows"
            aria-label="Tvshows"
            title={
              <NavbarMenuItem
                isActive={
                  pathname.includes("/tvshows") || pathname.includes("/tvshow")
                }
                className="flex flex-row items-center border-b-2 py-4"
              >
                <PiTelevisionSimpleFill />
                <span className="ml-2">Séries TV</span>
              </NavbarMenuItem>
            }
          >
            <Link
              className="ml-2"
              href="/tvshows/1"
              onClick={() => setIsMenuOpen(false)}
            >
              Liste
            </Link>
            <Link
              className="ml-2 mt-4"
              href="/tvshows/on-the-air/1"
              onClick={() => setIsMenuOpen(false)}
            >
              En cours de diffusion
            </Link>
          </AccordionItem>
        </Accordion>
        <NavbarMenuItem
          isActive={
            pathname.includes("/people") || pathname.includes("/person")
          }
          className="ml-2 flex w-[88%] flex-row items-center border-b-2 py-4"
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
          <Accordion itemClasses={{ content: "flex flex-col" }}>
            <AccordionItem
              key="profile"
              aria-label="Profile"
              title={
                <NavbarMenuItem
                  isActive={pathname.includes("/profile")}
                  className="flex flex-row items-center border-b-2 py-4"
                >
                  <IoPersonSharp />
                  <span className="ml-2">{username}</span>
                </NavbarMenuItem>
              }
            >
              <Link
                className="ml-2 mt-4 border-b-2 pb-4"
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex flex-col">
                  <span className="font-bold">{username}</span>
                  <span className="pt-2">Mon profil</span>
                </div>
              </Link>
              <Link
                className="ml-2 mt-4 text-gray-400"
                href="/tvshows/on-the-air/1"
                onClick={handleLogOut}
              >
                Déconnexion
              </Link>
            </AccordionItem>
          </Accordion>
        )}
      </NavbarMenu> */}
    </Navbar>
  );
};

export default Header;
