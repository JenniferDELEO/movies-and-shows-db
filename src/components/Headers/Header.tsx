"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem
} from "@nextui-org/react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { MdLocalMovies, MdPeople } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { IoPersonSharp } from "react-icons/io5";
import { TiHome } from "react-icons/ti";

import SearchBar from "@/components/Search/SearchBar";
import { createClient } from "../../../utils/supabase/client";
import { User } from "@supabase/auth-js";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userSession, setUserSession] = useState<User | null>(null)

  async function getUserSession() {
    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()
    setUserSession(user)
  }

  async function signOut() {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()
    console.log('error', error);
    window.location.reload()
  }

  useEffect(() => {
    getUserSession()
  }, [])

  console.log(userSession);

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
                isActive={pathname.includes("/tvs") || pathname.includes("/tv")}
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
                <DropdownItem href="/tvs/1" textValue="Liste">
                  <span>Liste</span>
                </DropdownItem>
                <DropdownItem
                  href="/tvs/on-the-air/1"
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
            {userSession === null ? (
              <NavbarItem className="ml-2 cursor-pointer">
                <div
                  onClick={() => router.replace("/login")}
                  className="text-sm lg:text-lg"
                >
                  Se connecter
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
                        {userSession.email}
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
                        <span className="font-bold">{userSession.email}</span>
                        <span className="pt-2">Mon profil</span>
                      </div>
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection>
                    {/* <DropdownItem href="/profile/settings">
                      <span className="pt-2">Paramètres</span>
                    </DropdownItem> */}
                    <DropdownItem
                      onPress={signOut}
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
    </Navbar>
  );
};

export default Header;
