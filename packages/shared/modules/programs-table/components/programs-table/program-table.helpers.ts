import { PlatformCurrency } from "gv-api-web";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";

export const composeCurrencyMap = (
  currencies: PlatformCurrency[] | undefined = []
): SelectFilterValue<string | undefined>[] => [
  { value: undefined, label: "Base" },
  ...currencies.map(({ name }) => ({ value: name, label: name }))
];

export const composeCurrencyFilter = (
  currencies: string[] | undefined = []
): SelectFilterValue<string | undefined>[] => [
  { value: undefined, label: "All" },
  ...currencies.map(x => ({ value: x, label: x }))
];
