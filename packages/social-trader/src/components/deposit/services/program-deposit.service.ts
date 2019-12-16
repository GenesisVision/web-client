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
): number =>
  amounts
    .find(({ serverType }) => serverType === broker)!
    .minInvestAmountIntoProgram.find(({ currency }) => currency === cur)!
    .amount;

export const getFundMinDeposit = (
  amounts: AmountWithCurrency[],
  cur: CurrencyEnum
): number => amounts.find(({ currency }) => currency === cur)!.amount;

export const programInvest: TAssetDeposit = ({
  id,
  amount,
  walletId
}: TAssetInvestCreatorArgs) =>
  investmentsApi.investIntoProgram(id, authService.getAuthArg(), {
    walletId,
    amount
  });
