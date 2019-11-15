import {
  FollowDetailsFull,
  FundDetailsFull,
  PersonalFollowDetailsFull,
  PersonalFundDetails,
  PersonalProgramDetails,
  ProgramDetailsFull
} from "gv-api-web";

export type DetailsFullType =
  | FundDetailsFull
  | ProgramDetailsFull
  | FollowDetailsFull;
export type PersonalDetailsType =
  | PersonalFundDetails
  | PersonalProgramDetails
  | PersonalFollowDetailsFull;
