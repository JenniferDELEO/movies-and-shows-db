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
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

import { getItems } from "@/components/Header/ItemsHeader";

const MediaHeader = () => {
  const pathname = usePathname();
  const baseUrl = `/${pathname.split("/")[1]}/${pathname.split("/")[2]}`;
  const type = pathname.split("/")[1];
  const dropdownItems = getItems(baseUrl, type);

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
          {dropdownItems && (
            <DropdownMenu aria-label="Vue d'ensemble">
              {dropdownItems.firstTab.map((item) => (
                <DropdownItem
                  key={item.key}
                  href={item.link}
                  textValue={item.name}
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
            <DropdownMenu aria-label="Médias">
              {dropdownItems.secondTab.map((item) => (
                <DropdownItem
                  key={item.key}
                  href={item.link}
                  textValue={item.name}
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
