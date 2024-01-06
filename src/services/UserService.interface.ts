export type UserCreateParams = {
  name: string;
};

export type GetUsersParams = {
  name?: string;
};

export type GetUserParams = GetUsersParams & {
  id?: number;
};
