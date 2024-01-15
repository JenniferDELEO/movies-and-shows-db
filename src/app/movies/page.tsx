"use client";

import { HiDotsCircleHorizontal } from "react-icons/hi";
import { FaListUl } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const Movies = () => {
  return (
    <>
      <div>Les films</div>
      <Dropdown placement="top">
        <DropdownTrigger>
          <button>
            <HiDotsCircleHorizontal className="cursor-pointer text-2xl" />
          </button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
          <DropdownItem key="addToList" startContent={<FaListUl />}>
            Ajouter à une liste
          </DropdownItem>
          <DropdownItem key="favorite" startContent={<FaHeart />}>
            Favoris
          </DropdownItem>
          <DropdownItem key="followed" startContent={<FaBookmark />}>
            Liste de suivi
          </DropdownItem>
          <DropdownItem key="note" startContent={<FaStar />}>
            Votre note
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        malesuada, diam quis dapibus sodales, eros urna sagittis augue, non
        porta quam neque ut arcu. Aenean ultricies purus nec justo blandit
        rhoncus. Sed semper orci ut facilisis vehicula. Donec pretium bibendum
        ex, eu pulvinar tortor viverra a. Nulla id commodo nisl. Vestibulum
        dignissim arcu at tempor pellentesque. Vestibulum non finibus ex,
        vestibulum vehicula diam. Duis scelerisque erat quis neque tristique
        tristique. Praesent sed est non lacus pellentesque congue sit amet ut
        dui. Mauris dignissim vulputate blandit. Ut posuere vehicula metus ut
        consequat. Morbi vitae imperdiet massa. Ut consequat purus ac elit
        efficitur tempor. Cras ultricies neque vitae nisl porta, eu fermentum
        lacus vestibulum. Aenean ut mi consequat sapien gravida porta. Nullam
        sollicitudin nibh est, sed auctor turpis molestie et. Nunc euismod justo
        in turpis volutpat consectetur. Pellentesque eu nibh odio. Suspendisse
        consequat felis nibh, vel lobortis felis mollis vitae. Nam venenatis
        ultricies vestibulum. Sed in quam ipsum. Sed tincidunt est dignissim,
        aliquet sem vitae, egestas felis. Suspendisse ullamcorper tincidunt
        tortor, in imperdiet nisi sagittis a. Maecenas auctor viverra nunc, sit
        amet semper augue lobortis a. Vestibulum consectetur scelerisque
        hendrerit. Maecenas ornare ac enim a suscipit. Morbi vitae auctor nisi,
        et blandit justo. Phasellus arcu sem, rutrum eget congue at, elementum
        et nibh. Aliquam erat volutpat. Vivamus vel convallis augue. Ut luctus
        at nisl et blandit. In efficitur consectetur gravida. Phasellus turpis
        magna, lacinia in metus a, convallis placerat ligula. Sed ultrices urna
        luctus erat bibendum dictum. Suspendisse consectetur eros nibh, nec
        maximus velit faucibus ut. Suspendisse potenti. Morbi viverra risus id
        urna accumsan aliquam. Vivamus eu enim eget sapien hendrerit dictum. In
        convallis molestie magna tempor dictum. Morbi urna diam, tempus sit amet
        fringilla vitae, congue in nunc. Mauris convallis quis arcu rhoncus
        facilisis. Cras auctor erat sed mauris suscipit ullamcorper. Curabitur
        ultricies sem massa, eu semper augue iaculis lacinia. Etiam dignissim
        rutrum erat, a blandit mauris feugiat ut. Mauris in leo fringilla,
        aliquam tortor at, porta arcu. Interdum et malesuada fames ac ante ipsum
        primis in faucibus. Donec lobortis lorem et finibus dignissim. Nullam
        nisi lectus, interdum sed tristique at, sodales sed nisi. Class aptent
        taciti sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Phasellus quis dignissim est. Pellentesque vel placerat sem.
        Sed quis convallis risus. Fusce mollis, purus vel sollicitudin ornare,
        erat dui dignissim lorem, in consectetur lorem ipsum vel felis. Sed nisl
        massa, lacinia et eros nec, hendrerit ultrices orci. In vel elit
        sodales, ullamcorper arcu et, imperdiet tortor. Quisque vitae purus
        porta, hendrerit est quis, ultrices diam. Nullam in viverra metus.
        Vivamus fermentum sagittis rutrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        malesuada, diam quis dapibus sodales, eros urna sagittis augue, non
        porta quam neque ut arcu. Aenean ultricies purus nec justo blandit
        rhoncus. Sed semper orci ut facilisis vehicula. Donec pretium bibendum
        ex, eu pulvinar tortor viverra a. Nulla id commodo nisl. Vestibulum
        dignissim arcu at tempor pellentesque. Vestibulum non finibus ex,
        vestibulum vehicula diam. Duis scelerisque erat quis neque tristique
        tristique. Praesent sed est non lacus pellentesque congue sit amet ut
        dui. Mauris dignissim vulputate blandit. Ut posuere vehicula metus ut
        consequat. Morbi vitae imperdiet massa. Ut consequat purus ac elit
        efficitur tempor. Cras ultricies neque vitae nisl porta, eu fermentum
        lacus vestibulum. Aenean ut mi consequat sapien gravida porta. Nullam
        sollicitudin nibh est, sed auctor turpis molestie et. Nunc euismod justo
        in turpis volutpat consectetur. Pellentesque eu nibh odio. Suspendisse
        consequat felis nibh, vel lobortis felis mollis vitae. Nam venenatis
        ultricies vestibulum. Sed in quam ipsum. Sed tincidunt est dignissim,
        aliquet sem vitae, egestas felis. Suspendisse ullamcorper tincidunt
        tortor, in imperdiet nisi sagittis a. Maecenas auctor viverra nunc, sit
        amet semper augue lobortis a. Vestibulum consectetur scelerisque
        hendrerit. Maecenas ornare ac enim a suscipit. Morbi vitae auctor nisi,
        et blandit justo. Phasellus arcu sem, rutrum eget congue at, elementum
        et nibh. Aliquam erat volutpat. Vivamus vel convallis augue. Ut luctus
        at nisl et blandit. In efficitur consectetur gravida. Phasellus turpis
        magna, lacinia in metus a, convallis placerat ligula. Sed ultrices urna
        luctus erat bibendum dictum. Suspendisse consectetur eros nibh, nec
        maximus velit faucibus ut. Suspendisse potenti. Morbi viverra risus id
        urna accumsan aliquam. Vivamus eu enim eget sapien hendrerit dictum. In
        convallis molestie magna tempor dictum. Morbi urna diam, tempus sit amet
        fringilla vitae, congue in nunc. Mauris convallis quis arcu rhoncus
        facilisis. Cras auctor erat sed mauris suscipit ullamcorper. Curabitur
        ultricies sem massa, eu semper augue iaculis lacinia. Etiam dignissim
        rutrum erat, a blandit mauris feugiat ut. Mauris in leo fringilla,
        aliquam tortor at, porta arcu. Interdum et malesuada fames ac ante ipsum
        primis in faucibus. Donec lobortis lorem et finibus dignissim. Nullam
        nisi lectus, interdum sed tristique at, sodales sed nisi. Class aptent
        taciti sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Phasellus quis dignissim est. Pellentesque vel placerat sem.
        Sed quis convallis risus. Fusce mollis, purus vel sollicitudin ornare,
        erat dui dignissim lorem, in consectetur lorem ipsum vel felis. Sed nisl
        massa, lacinia et eros nec, hendrerit ultrices orci. In vel elit
        sodales, ullamcorper arcu et, imperdiet tortor. Quisque vitae purus
        porta, hendrerit est quis, ultrices diam. Nullam in viverra metus.
        Vivamus fermentum sagittis rutrum.
      </p>
    </>
  );
};

export default Movies;
