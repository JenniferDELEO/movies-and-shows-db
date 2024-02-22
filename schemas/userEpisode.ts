import { defineField } from "sanity";

const userEpisode = {
  name: "user_episode",
  title: "User Episode",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "episode",
      title: "Episode",
      type: "reference",
      to: [{ type: "episode" }],
    }),
    defineField({
      name: "account_states",
      title: "Account States",
      type: "object",
      fields: [
        {
          name: "watched",
          title: "Watched",
          type: "boolean",
          initialValue: false,
        },
      ],
    }),
  ],
};

export default userEpisode;
