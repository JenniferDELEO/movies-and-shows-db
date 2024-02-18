import { defineField } from "sanity";

const season = {
  name: "season",
  title: "Season",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "reference",
      to: [{ type: "tv" }],
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
      name: "number_of_episodes",
      title: "Number of Episodes",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tmdb_id",
      title: "TMDB ID",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "release_date",
      title: "Release Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "episodes",
      title: "Episodes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "episode_name",
              title: "Episode Name",
              type: "string",
            },
            {
              name: "episode_number",
              title: "Episode Number",
              type: "number",
            },
            {
              name: "episode_total_number",
              title: "Episode Total Number",
              type: "number",
            },
            {
              name: "episode_runtime",
              title: "Episode Runtime",
              type: "number",
            },
            {
              name: "episode_release_date",
              title: "Episode Release Date",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
};

export default season;
