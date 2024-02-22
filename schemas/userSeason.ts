import { defineField } from "sanity";

const userSeason = {
  name: "user_season",
  title: "User Season",
  type: "document",
  fields: [
    defineField({
      name: "user_name",
      title: "User Name",
      type: "string",
      validation: (Rule) => Rule.required(),
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
    }),
    defineField({
      name: "account_states",
      title: "Account States",
      type: "object",
      fields: [
        {
          name: "all_watched",
          title: "All Watched",
          type: "boolean",
          initialValue: false,
        },
      ],
    }),
  ],
};

export default userSeason;
