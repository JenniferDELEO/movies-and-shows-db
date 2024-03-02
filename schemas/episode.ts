import { defineField } from "sanity";

const episode = {
  name: "episode",
  title: "Episode",
  type: "document",
  fields: [
    defineField({
      name: "episode_title",
      title: "Episode Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "episode_number",
      title: "Episode Number",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "episode_total_number",
      title: "Episode Total Number",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "season_number",
      title: "Season Number",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "episode_release_date",
      title: "Episode Release Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "episode_runtime",
      title: "Episode Runtime",
      type: "number",
    }),
    defineField({
      name: "tmdb_id",
      title: "TMDB ID",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
  ],
};

export default episode;
