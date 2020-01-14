import { STATUS } from "constants/constants";
import {
  PersonalFollowDetailsFull,
  PersonalFundDetails,
  PersonalProgramDetails
} from "gv-api-web";

export type InvestmentBlockDetailsType =
  | PersonalFundDetails
  | PersonalProgramDetails
  | PersonalFollowDetailsFull;

export type InvestmentType = PersonalFundDetails & PersonalProgramDetails;

export const haveActiveInvestment = (
  details: PersonalFundDetails | PersonalProgramDetails
): boolean =>
  !!details &&
  "isInvested" in details &&
  details.isInvested &&
  details.status !== STATUS.ENDED;
