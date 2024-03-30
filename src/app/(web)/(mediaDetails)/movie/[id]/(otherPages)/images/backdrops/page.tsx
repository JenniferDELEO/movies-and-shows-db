import LoadingSpinner from "@/app/(web)/loading";
import ImagesWrapper from "@/components/DetailsMedia/Wrappers/ImagesWrapper";
import { getImagesMovie } from "@/libs/api/movies";
import { Suspense } from "react";

type Props = {
  params: { id: string };
};

const Backdrops = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const images = await getImagesMovie(id);

  const classNames = {
    container: "flex flex-row flex-wrap items-center justify-evenly",
    card: "m-2 max-h-[295px] min-h-[295px] min-w-[348px] max-w-[348px] overflow-hidden",
    cardFooter: "flex max-h-[100px] min-h-[100px] flex-col py-1 text-sm",
  };

  return (
    <div className="mx-auto size-full md:w-[95%] lg:w-[90%]">
      <Suspense fallback={<LoadingSpinner />}>
        <ImagesWrapper
          images={images?.backdrops}
          imageWidth={324}
          imageHeight={182}
          classNames={classNames}
          title={`Tous les fonds d'écran (${images?.backdrops.length})`}
        />
      </Suspense>
    </div>
  );
};

export default Backdrops;
