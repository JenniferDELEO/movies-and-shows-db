export type InternalUser = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  _createdAt: Date;
  image: string | null;
};
