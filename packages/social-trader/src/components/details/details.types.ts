import {
  FollowDetailsFull,
  FundDetailsFull,
  PersonalFollowDetailsFull,
  PersonalFundDetails,
  PersonalProgramDetails,
  PrivateTradingAccountFull,
  ProgramDetailsFull,
  ProgramFollowDetailsFull
} from "gv-api-web";

export type DetailsFullType =
  | FundDetailsFull
  | ProgramFollowDetailsFull
  | PrivateTradingAccountFull;
export type PersonalDetailsType =
  | PersonalFundDetails
  | PersonalProgramDetails
  | PersonalFollowDetailsFull;
