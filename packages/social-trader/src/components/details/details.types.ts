import {
  FollowDetailsFull,
  FundDetailsFull,
  PersonalFollowDetailsFull,
  PersonalFundDetails,
  PersonalProgramDetails,
  PrivateTradingAccountFull,
  ProgramDetailsFull
} from "gv-api-web";

export type DetailsFullType =
  | FundDetailsFull
  | ProgramDetailsFull
  | FollowDetailsFull
  | PrivateTradingAccountFull;
export type PersonalDetailsType =
  | PersonalFundDetails
  | PersonalProgramDetails
  | PersonalFollowDetailsFull;
