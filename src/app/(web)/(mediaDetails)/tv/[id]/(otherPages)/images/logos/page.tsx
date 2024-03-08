import ImagesWrapper from "@/components/DetailsMedia/Wrappers/ImagesWrapper";
import { getImagesTv } from "@/libs/api/tvs";

type Props = {
  params: { id: string };
};

const Logos = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const images = await getImagesTv(id);

  const classNames = {
    container: "flex flex-row flex-wrap items-center justify-evenly",
    card: "m-2 max-h-[295px] min-h-[295px] min-w-[348px] max-w-[348px] overflow-hidden",
    cardFooter: "flex max-h-[100px] min-h-[100px] flex-col py-1 text-sm",
  };

  return (
    <div className="mx-auto size-full md:w-[95%] lg:w-[90%]">
      <ImagesWrapper
        images={images?.logos}
        imageWidth={324}
        imageHeight={182}
        classNames={classNames}
        title={`Tous les logos (${images?.logos.length})`}
      />
    </div>
  );
};

export default Logos;
