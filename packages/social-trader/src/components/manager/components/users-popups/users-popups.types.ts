import { IDataModel } from "constants/constants";
import { ProfilePublicShort } from "gv-api-web";

export type UsersListItemType = ProfilePublicShort;

export type UsersListDataType = IDataModel<UsersListItemType[]>;
