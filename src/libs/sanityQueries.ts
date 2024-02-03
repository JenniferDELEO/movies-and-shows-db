import { groq } from "next-sanity";

export const getUserDataQuery = groq`*[_type == "user" && _id == $userId][0] {
    _id,
    name,
    email,
    isAdmin,
    _createdAt,
    image
}`;
