import { defineField } from "sanity";

const tvShow = {
  name: "tv_show",
  title: "TV Show",
  type: "document",
  fields: [
    defineField({
      name: "tmdb_id",
      title: "TMDB ID",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
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
      name: "users",
      title: "Users",
      type: "array",
      of: [{ type: "reference", to: [{ type: "user" }] }],
      validation: (Rule) => Rule.required(),
    }),
  ],
};

export default tvShow;
