import { SortingColumn } from "components/table/components/filtering/filter.type";
import { formatValueWithTick } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { AssetBalance } from "pages/trade/binance-trade-page/trading/terminal.types";
import { fetchRate } from "services/rate-service";
import { formatCurrencyValue } from "utils/formatter";
import { AnyObjectType, CurrencyEnum } from "utils/types";

export type NormalizedFunds = {
  [key: string]: AssetBalance;
};

export const sortFundsFunc = (a: AssetBalance, b: AssetBalance) => {
  return b.amountInCurrency - a.amountInCurrency;
};

export const updateUsdValues = async (
  funds: NormalizedFunds,
  currency: CurrencyEnum
): Promise<NormalizedFunds> => {
  const newList = { ...funds };
  const fundsList = Object.values(funds);
  const rates = await Promise.allSettled(
    fundsList
      .map(({ asset }) => asset)
      .map(asset => fetchRate(asset as CurrencyEnum, currency))
  ).then(results =>
    results.map(res => (res.status === "fulfilled" ? res.value : -1))
  );

  for (let i = 0; i < fundsList.length; i++) {
    const { asset, free, locked } = fundsList[i];
    const rate = rates[i];
    const total = formatValueWithTick(+free + +locked, "0.00000001");
    const newAmountInCurrency =
      rate < 0 ? -1 : +formatCurrencyValue(+total * rate, currency);
    newList[asset] = {
      ...newList[asset],
      amountInCurrency: newAmountInCurrency || newList[asset].amountInCurrency
    };
  }
  return newList;
};

export const FUNDS_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "coin"
  },
  {
    name: "total"
  },
  {
    name: "available"
  },
  {
    name: "in-order"
  },
  {
    name: "-value"
  }
];

export const FUTURES_FUNDS_TABLE_COLUMNS: SortingColumn[] = [
  ...FUNDS_TABLE_COLUMNS,
  { name: "" }
];

export const normalizeFundsList = (
  list: AssetBalance[]
): { [key: string]: AssetBalance } => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.asset] = item));
  return initObject;
};
