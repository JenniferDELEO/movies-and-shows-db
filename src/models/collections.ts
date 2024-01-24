import { Movie } from "./movies";

export type Collection = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: Movie[];
};
