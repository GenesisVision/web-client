import { UsersFilterSorting } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export type GetUsersOptionsType = {
  facetId?: string;
  sorting?: UsersFilterSorting;
  tags?: Array<string>;
  skip?: number;
  take?: number;
};

export const getUsers = (filters?: GetUsersOptionsType) =>
  api.users().getUsersList(filters);
