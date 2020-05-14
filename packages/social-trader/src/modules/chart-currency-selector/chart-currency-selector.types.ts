import { ISelectChangeEvent } from "components/select/select";
import { CurrencyEnum } from "utils/types";

export type TChartCurrency = {
  name: CurrencyEnum;
  color: string;
};

export type TAddChartCurrency = (currency: CurrencyEnum) => void;
export type TRemoveChartCurrency = (id: string) => void;
export type TChangeChartCurrency = (
  i: number
) => (event: ISelectChangeEvent, child: JSX.Element) => void;
