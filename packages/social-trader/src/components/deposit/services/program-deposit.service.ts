import { AmountWithCurrency, ProgramMinInvestAmount } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import { CurrencyEnum } from "utils/types";

import {
  TAssetDeposit,
  TAssetInvestCreatorArgs
} from "../components/deposit.types";

export const minProgramDepositsDefaultData: AmountWithCurrency[] = [
  { amount: 0, currency: "GVT" },
  { amount: 0, currency: "BTC" },
  { amount: 0, currency: "ETH" },
  { amount: 0, currency: "USDT" }
];

export const getMinProgramDeposits = ({
  programMinDepositAmounts,
  broker
}: {
  broker: string;
  programMinDepositAmounts: ProgramMinInvestAmount[];
}): AmountWithCurrency[] => {
  const brokerIndex = programMinDepositAmounts.findIndex(
    ({ serverType }) => serverType === broker
  );
  return programMinDepositAmounts[brokerIndex]?.minInvestAmountIntoProgram;
};

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
  api.investments().investIntoProgram(id, {
    walletId,
    amount
  });
