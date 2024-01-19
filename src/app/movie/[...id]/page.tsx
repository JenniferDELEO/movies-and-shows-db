import { getMovieDetail } from "@/libs/api/movies";
import React from "react";

const Movie = async ({ params }: { params: { id: string[] } }) => {
  if (!params.id) return <div>Chargement...</div>;

  const data = await getMovieDetail(params.id[0]);

  return <div>page</div>;
};

export default Movie;
