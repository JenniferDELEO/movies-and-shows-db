import { defineField } from "sanity";

const userTvShows = {
  name: "user_tvshows",
  title: "User TV Shows",
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
      name: "tvshows",
      title: "TV Shows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "tvshow",
              title: "TV Show",
              type: "reference",
              to: [{ type: "tvshow" }],
            },
            {
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
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
};

export default userTvShows;
