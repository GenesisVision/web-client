import { PersonalFundDetails, PersonalProgramDetails } from "gv-api-web";

export type InvestmentDetails = PersonalFundDetails | PersonalProgramDetails;

export const composeInvestmentDetails = (
  personalDetails: InvestmentDetails
) => ({
  canWithdraw: personalDetails.canWithdraw,
  canInvest: personalDetails.canInvest,
  isInvested: personalDetails.isInvested,
  pendingInput: personalDetails.pendingInput,
  pendingOutput: personalDetails.pendingOutput,
  pendingOutputIsWithdrawAll: false, // TODO personalDetails.pendingOutputIsWithdrawAll,
  status: personalDetails.status,
  value: personalDetails.value,
  invested: personalDetails.isInvested,
  profitPercent: personalDetails.value //profit
});
