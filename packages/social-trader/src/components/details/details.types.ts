import {
  PersonalFollowDetailsFull,
  PersonalFundDetails,
  PersonalProgramDetails
} from "gv-api-web";

export type PersonalDetailsType =
  | PersonalFundDetails
  | PersonalProgramDetails
  | PersonalFollowDetailsFull;

export enum DETAILS_TYPE {
  ASSET = "ASSET",
  USER = "USER"
}
