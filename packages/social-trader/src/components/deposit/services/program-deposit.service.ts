import { AmountWithCurrency, ProgramMinInvestAmount } from "gv-api-web";
import investmentsApi from "services/api-client/investments-api";
import authService from "services/auth-service";
import { CurrencyEnum } from "utils/types";

import {
  TAssetDeposit,
  TAssetInvestCreatorArgs
} from "../components/deposit.types";

export const getMinProgramDeposit = (
  amounts: ProgramMinInvestAmount[],
  cur: CurrencyEnum,
  broker: string
): number => {
  const amountInBroker = amounts.find(
    ({ serverType }) => serverType === broker
  );
  if (!amountInBroker) return 0;
  const amountInCurr = amountInBroker.minInvestAmountIntoProgram.find(
    ({ currency }) => currency === cur
  );
  return amountInCurr ? amountInCurr.amount : 0;
};

export const getFundMinDeposit = (
  amounts: AmountWithCurrency[],
  cur: CurrencyEnum
): number => {
  const amountInCurr = amounts.find(({ currency }) => currency === cur);
  return amountInCurr ? amountInCurr.amount : 0;
};

export const programInvest: TAssetDeposit = ({
  id,
  amount,
  walletId
}: TAssetInvestCreatorArgs) =>
  investmentsApi.investIntoProgram(id, authService.getAuthArg(), {
    walletId,
    amount
  });
