import { defineField } from "sanity";

const userTv = {
  name: "user_tv",
  title: "User TV",
  type: "document",
  fields: [
    defineField({
      name: "user_name",
      title: "User Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tv_title",
      title: "TV Title",
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

export default userTv;
