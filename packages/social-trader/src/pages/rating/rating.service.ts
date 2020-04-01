import { UserDetailsList, UsersFilterSorting } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const getUsersList = (values: Object): Promise<Array<UserDetailsList>> =>
  api
    .users()
    .getUsersList(values)
    .then(({ items }) => items);

export const getUsersRating = (values: {
  sorting: UsersFilterSorting;
}): Promise<Array<UserDetailsList>> => getUsersList({ ...values, take: 5 });
