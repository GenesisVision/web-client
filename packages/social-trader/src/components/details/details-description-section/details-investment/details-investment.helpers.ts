import { STATUS } from "constants/constants";
import { PersonalFundDetails, PersonalProgramDetails } from "gv-api-web";

export type InvestmentType = PersonalFundDetails & PersonalProgramDetails;

export const haveActiveInvestment = (
  details: PersonalFundDetails | PersonalProgramDetails
): boolean =>
  !!details &&
  "isInvested" in details &&
  details.isInvested &&
  details.status !== STATUS.ENDED;
