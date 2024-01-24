"use client";

import PropTypes from "prop-types";
import { Dispatch, FC, SetStateAction } from "react";
import { MdClose } from "react-icons/md";

type Props = {
  embedId: string;
  setOpenTrailer: Dispatch<SetStateAction<boolean>>;
};

const YoutubeEmbed: FC<Props> = ({ embedId, setOpenTrailer }) => (
  <div className="fixed left-0 top-0 z-20 h-[100vh] min-h-[100vh] w-[100vw] min-w-[100vw] bg-primary/90">
    <div className="mx-4 mt-[25%] flex flex-row items-center justify-between md:mx-40 md:mt-20">
      <h2 className="text-lg font-bold">Bande-annonce</h2>
      <button onClick={() => setOpenTrailer(false)}>
        <MdClose size={18} />
      </button>
    </div>
    <div className="mt-[25%] max-h-[500px] sm:mt-[5%] md:mt-10">
      <div className="relative z-30 h-0 overflow-hidden pb-[56.25%]">
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${embedId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
          className="absolute left-[50%] top-[25%] size-full max-h-[480px] max-w-[853px] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
