import { defineField } from "sanity";

const userMovie = {
  name: "user_movie",
  title: "User Movie",
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
      name: "movies",
      title: "Movies",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "movie",
              title: "Movie",
              type: "reference",
              to: [{ type: "movie" }],
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
                    list: ["watched", "to_watch"],
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

export default userMovie;
