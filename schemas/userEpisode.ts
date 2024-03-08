import { defineField } from "sanity";

const userEpisode = {
  name: "user_episode",
  title: "User Episode",
  type: "document",
  fields: [
    defineField({
      name: "season_number",
      title: "Season Number",
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
      name: "watched",
      title: "Watched",
      type: "boolean",
      initialValue: false,
    }),
  ],
};

export default userEpisode;
