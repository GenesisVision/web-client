import {
  PersonalFollowDetailsFull,
  PersonalFundDetails,
  PersonalProgramDetails
} from "gv-api-web";
import { STATUS } from "shared/constants/constants";

export type InvestmentBlockDetailsType =
  | PersonalFundDetails
  | PersonalProgramDetails
  | PersonalFollowDetailsFull;

export type InvestmentType = PersonalFundDetails | PersonalProgramDetails;

export const haveActiveInvestment = (
  details: InvestmentBlockDetailsType
): boolean =>
  !!details &&
  "isInvested" in details &&
  details.isInvested &&
  details.status !== STATUS.ENDED;
