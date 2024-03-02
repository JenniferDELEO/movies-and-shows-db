import { defineField } from "sanity";

const season = {
  name: "season",
  title: "Season",
  type: "document",
  fields: [
    defineField({
      name: "tv_name",
      title: "TV Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "season_number",
      title: "Season Number",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tv",
      title: "TV",
      type: "reference",
      to: [{ type: "tv" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "number_of_episodes",
      title: "Number of Episodes",
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
      name: "tmdb_id",
      title: "TMDB ID",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "episodes",
      title: "Episodes",
      type: "array",
      of: [{ type: "episode" }],
    }),
  ],
};

export default season;
