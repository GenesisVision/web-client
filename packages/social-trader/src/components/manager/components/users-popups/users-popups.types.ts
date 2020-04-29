import { IDataModel } from "constants/constants";
import { ProfilePublic } from "gv-api-web";

export type UsersListItemType = ProfilePublic;

export type UsersListDataType = IDataModel<UsersListItemType[]>;
