import { defineField } from "sanity";

const movie = {
  name: "movie",
  title: "Movie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "runtime",
      title: "Runtime",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "release_date",
      title: "Release Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "genres",
      title: "Genres",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "poster_path",
      title: "Poster Path",
      type: "string",
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
    }),
    defineField({
      name: "tmdb_id",
      title: "TMDB ID",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
  ],
};

export default movie;
