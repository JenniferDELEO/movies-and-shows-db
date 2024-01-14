/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button, Pagination as PaginationNextUi } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

type Props = {
  total: number;
};

const Pagination: FC<Props> = ({ total }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const [currentPage, setCurrentPage] = useState(
    Number(params.get("page")) || 1
  );

  useEffect(() => {
    params.set("page", currentPage.toString());
    replace(`/search?${params.toString()}`);
  }, [currentPage]);

  return (
    <div className="col-span-2 flex flex-row mx-auto">
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
