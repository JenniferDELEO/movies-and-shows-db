import { defineField } from "sanity";

const userSeason = {
  name: "user_season",
  title: "User Seasons",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "seasons",
      title: "Seasons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "season",
              title: "Season",
              type: "reference",
              to: [{ type: "season" }],
            },
            {
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
                {
                  name: "episodes",
                  title: "Episodes",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        {
                          name: "episode_id",
                          title: "Episode Id",
                          type: "string",
                        },
                        {
                          name: "episode_number",
                          title: "Episode Number",
                          type: "number",
                        },
                        {
                          name: "watched",
                          title: "Watched",
                          type: "boolean",
                          initialValue: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
};

export default userSeason;
