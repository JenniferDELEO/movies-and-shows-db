/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button, Pagination as PaginationNextUi } from "@nextui-org/react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

type Props = {
  total: number;
  scrollToTop?: () => void;
  fromSearch?: boolean;
  currentPage?: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
};

const Pagination: FC<Props> = ({
  total,
  scrollToTop,
  fromSearch,
  currentPage: _currentPage,
  setCurrentPage: _setCurrentPage,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const params = new URLSearchParams(searchParams);
  const [currentPage, setCurrentPage] = useState(
    Number(params.get("page")) || _currentPage || 1,
  );

  useEffect(() => {
    if (fromSearch) {
      params.set("page", currentPage.toString());
      push(`/search?${params.toString()}`);
    } else {
      _setCurrentPage && _setCurrentPage(currentPage);
      scrollToTop && scrollToTop();
      window.history.pushState(
        null,
        "",
        `/${pathname.split("/")[1]}/${currentPage}`,
      );
    }
  }, [fromSearch, currentPage]);

  return (
    <div className="col-span-2 mx-auto mt-4 flex w-fit flex-row">
      <Button
        size="sm"
        variant="flat"
        onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
      >
        <GrPrevious />
      </Button>
      <PaginationNextUi
        total={total}
        initialPage={1}
        variant="light"
        color="secondary"
        page={currentPage}
        onChange={setCurrentPage}
        classNames={{ item: "w-fit" }}
      />
      <Button
        size="sm"
        variant="flat"
        onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}
      >
        <GrNext />
      </Button>
    </div>
  );
};

export default Pagination;
