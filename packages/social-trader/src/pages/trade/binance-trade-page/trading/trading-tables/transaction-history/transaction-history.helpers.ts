import { SortingColumn } from "components/table/components/filtering/filter.type";
import { BinanceIncomeType } from "gv-api-web";
import { TFunction } from "i18next";

export const TRANSACTION_HISTORY_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "time"
  },
  {
    name: "type"
  },
  {
    name: "amount"
  },
  {
    name: "asset"
  },
  {
    name: "symbol"
  }
];

export const getIncomeTypeLabel = (
  t: TFunction,
  incomeType: BinanceIncomeType
): string => {
  switch (incomeType) {
    case "Commission":
      return t("Commission");
    case "FundingFee":
      return t("Funding Fee");
    case "InsuranceClear":
      return t("Insurance Clear");
    case "RealizedPnl":
      return t("Realized PNL");
    case "Transfer":
      return t("Transfer");
    case "WelcomeBonus":
      return t("Welcome Bonus");
    default:
      return incomeType;
  }
};
