import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";

export const composeCurrencyMap = (
  currencies: string[] | undefined = []
): SelectFilterValue<string | undefined>[] => [
  { value: undefined, label: "Base" },
  ...currencies.map(x => ({ value: x, label: x }))
];

export const composeCurrencyFilter = (
  currencies: string[] | undefined = []
): SelectFilterValue<string | undefined>[] => [
  { value: undefined, label: "All" },
  ...currencies.map(x => ({ value: x, label: x }))
];
