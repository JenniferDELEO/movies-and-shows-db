import { defineField } from "sanity";

const episode = {
  name: "episode",
  title: "Episode",
  type: "document",
  fields: [
    defineField({
      name: "tmdb_id",
      title: "TMDB ID",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "episode_number",
      title: "Episode Number",
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
      name: "release_date",
      title: "Release Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "runtime",
      title: "Runtime",
      type: "number",
    }),
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
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
      name: "season",
      title: "Season",
      type: "reference",
      to: [{ type: "season" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "account_states",
      title: "Account States",
      type: "object",
      fields: [
        {
          name: "status",
          title: "Status",
          type: "string",
          options: {
            list: ["watched", "to_watch"],
          },
        },
      ],
    }),
  ],
};

export default episode;
