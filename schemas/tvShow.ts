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
      name: "total_runtime",
      title: "Total Runtime",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
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
            list: ["active", "archived", "to_discover"],
          },
        },
        {
          name: "watch_state",
          title: "Watch State",
          type: "string",
          options: {
            list: ["started", "finished", "to_watch"],
          },
        },
      ],
    }),
  ],
};

export default tvShow;
