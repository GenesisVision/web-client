import {
  PersonalFundDetailsFull,
  PersonalProgramDetailsFull
} from "gv-api-web";

export interface InvestmentDetails
  extends PersonalFundDetailsFull,
    PersonalProgramDetailsFull {}

export const composeInvestmentDetails = (
  personalDetails: PersonalFundDetailsFull | PersonalProgramDetailsFull
) => ({
  canWithdraw: personalDetails.canWithdraw,
  canInvest: personalDetails.canInvest,
  isInvested: personalDetails.isInvested,
  pendingInput: personalDetails.pendingInput,
  pendingOutput: personalDetails.pendingOutput,
  status: personalDetails.status,
  value: personalDetails.value,
  invested: personalDetails.invested,
  profitPercent: personalDetails.profit
});
