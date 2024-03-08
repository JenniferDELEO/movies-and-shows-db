import { defineField } from "sanity";

const tv = {
  name: "tv",
  title: "TV",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "number_of_seasons",
      title: "Number of Seasons",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "number_of_episodes",
      title: "Number of Episodes",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "release_date",
      title: "Release Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "total_runtime",
      title: "Total Runtime",
      type: "number",
      initialValue: 0,
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

export default tv;
