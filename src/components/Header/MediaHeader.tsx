"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

const MediaHeader = () => {
  return (
    <Navbar
      classNames={{
        base: "fixed top-[64px] bg-white/90 justify-center",
        wrapper: "lg:max-w-[80%] mx-auto justify-center",
        item: ["sm:text-xl mr-2"],
      }}
    >
      <NavbarContent className="flex" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="bg-transparent p-0 text-primary data-[hover=true]:bg-transparent"
                endContent={<FaChevronDown />}
                radius="sm"
                variant="light"
              >
                Vue d&apos;ensemble
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            <DropdownItem>
              <Link href={`/`}>Page Principale</Link>
            </DropdownItem>
            <DropdownItem>
              <Link href={`/`}>Distribution des rôles et équipe technique</Link>
            </DropdownItem>
            <DropdownItem>
              <Link href={`/`}>Dates de sortie</Link>
            </DropdownItem>
            <DropdownItem>
              <Link href={`/`}>Similaires</Link>
            </DropdownItem>
            <DropdownItem>
              <Link href={`/`}>Recommendations</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="bg-transparent p-0 text-primary data-[hover=true]:bg-transparent"
                endContent={<FaChevronDown />}
                radius="sm"
                variant="light"
              >
                Médias
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            <DropdownItem>
              <Link href={`/`}>Fonds d&apos;écrans</Link>
            </DropdownItem>
            <DropdownItem>
              <Link href={`/`}>Logos</Link>
            </DropdownItem>
            <DropdownItem>
              <Link href={`/`}>Affiches</Link>
            </DropdownItem>
            <DropdownItem>
              <Link href={`/`}>Vidéos</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default MediaHeader;
