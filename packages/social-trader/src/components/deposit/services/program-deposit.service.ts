import { AmountWithCurrency, ProgramMinInvestAmount } from "gv-api-web";
import investmentsApi from "services/api-client/investments-api";
import authService from "services/auth-service";
import { fetchRate } from "services/rate-service";
import { convertToCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
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

export const getMinProgramDeposits = async ({
  minDeposit,
  programCurrency,
  currencies = ["GVT", "BTC", "ETH", "USDT"]
}: {
  minDeposit: number;
  programCurrency: CurrencyEnum;
  currencies: CurrencyEnum[];
}): Promise<AmountWithCurrency[]> => {
  const rates = await Promise.all(
    currencies.map(currency => {
      return fetchRate(currency, programCurrency);
    })
  );
  return currencies.map((currency, i) => {
    const rate = rates[i];
    const amount = +formatCurrencyValue(
      convertToCurrency(minDeposit, rate),
      currency,
      { up: true }
    );
    return { amount, currency };
  });
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
  investmentsApi.investIntoProgram(id, authService.getAuthArg(), {
    walletId,
    amount
  });
