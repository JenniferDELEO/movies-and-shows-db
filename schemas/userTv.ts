import { defineField } from "sanity";

const userTv = {
  name: "user_tv",
  title: "User TVs",
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
      name: "tvs",
      title: "TVs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "tv",
              title: "TV",
              type: "reference",
              to: [{ type: "tv" }],
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

export default userTv;
