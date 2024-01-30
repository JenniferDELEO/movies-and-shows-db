"use client";

import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

import { getItems } from "@/components/Headers/ItemsHeader";
import { FC } from "react";

type Props = {
  numberOfBackdrops: number;
  numberOfLogos: number;
  numberOfPosters: number;
  numberOfVideos: number;
};

const MediaHeader: FC<Props> = (props) => {
  const { numberOfBackdrops, numberOfLogos, numberOfPosters, numberOfVideos } =
    props;
  const pathname = usePathname();
  const baseUrl = `/${pathname.split("/")[1]}/${pathname.split("/")[2]}`;
  const type = pathname.split("/")[1];
  const dropdownItems = getItems(
    baseUrl,
    type,
    numberOfBackdrops,
    numberOfLogos,
    numberOfPosters,
    numberOfVideos,
  );

  return (
    <Navbar
      classNames={{
        base: "fixed top-[64px] bg-white/90 justify-center z-30",
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
          {dropdownItems && (
            <DropdownMenu
              aria-label="Vue d'ensemble"
              classNames={{
                base: "bg-primary border-primary border-2 rounded-lg shadow-primary outline-none",
              }}
            >
              {dropdownItems.firstTab.map((item) => (
                <DropdownItem
                  key={item.key}
                  href={item.link}
                  textValue={item.name}
                  classNames={{ base: "bg-primary border-primary" }}
                >
                  {item.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
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
          {dropdownItems && (
            <DropdownMenu
              aria-label="Médias"
              classNames={{
                base: "bg-primary border-primary border-2 rounded-lg shadow-primary outline-none",
              }}
            >
              {dropdownItems.secondTab.map((item) => (
                <DropdownItem
                  key={item.key}
                  href={item.link}
                  textValue={item.name}
                  endContent={<Chip>{item.number}</Chip>}
                >
                  {item.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default MediaHeader;
