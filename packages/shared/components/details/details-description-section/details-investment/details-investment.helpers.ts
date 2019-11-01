import {
  PersonalFundDetailsFullOld,
  PersonalProgramDetailsFullOld
} from "gv-api-web";

export interface InvestmentDetails
  extends PersonalFundDetailsFullOld,
    PersonalProgramDetailsFullOld {}

export const composeInvestmentDetails = (
  personalDetails: PersonalFundDetailsFullOld | PersonalProgramDetailsFullOld
) => ({
  canWithdraw: personalDetails.canWithdraw,
  canInvest: personalDetails.canInvest,
  isInvested: personalDetails.isInvested,
  pendingInput: personalDetails.pendingInput,
  pendingOutput: personalDetails.pendingOutput,
  pendingOutputIsWithdrawAll: personalDetails.pendingOutputIsWithdrawAll,
  status: personalDetails.status,
  value: personalDetails.value,
  invested: personalDetails.invested,
  profitPercent: personalDetails.profit
});
