import ImagesWrapper from "@/components/DetailsMedia/Wrappers/ImagesWrapper";
import { getImagesTvShow } from "@/libs/api/tvshows";

type Props = {
  params: { id: string };
};

const Posters = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const images = await getImagesTvShow(id);

  const classNames = {
    container: "flex flex-row flex-wrap items-center justify-evenly",
    card: "m-2 max-h-[450px] min-h-[450px] min-w-[228px] max-w-[228px] overflow-hidden",
    cardFooter: "flex max-h-[100px] min-h-[100px] flex-col py-1 text-sm",
  };

  return (
    <div className="mx-auto size-full pt-[100px] md:w-[95%] lg:w-[90%]">
      <ImagesWrapper
        images={images?.posters}
        imageWidth={228}
        imageHeight={345}
        classNames={classNames}
      />
    </div>
  );
};

export default Posters;
