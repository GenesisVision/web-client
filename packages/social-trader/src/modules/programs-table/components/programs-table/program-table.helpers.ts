import { SelectFilterValue } from "components/table/components/filtering/filter.type";
import { PlatformCurrencyInfo } from "gv-api-web";

export const composeCurrencyMap = (
  currencies: PlatformCurrencyInfo[] | undefined = []
): SelectFilterValue<string | undefined>[] => {
  return [
    { value: undefined, label: "Base" },
    ...currencies.map(({ name }) => ({ value: name, label: name }))
  ];
};
export const composeCurrencyMapWithoutBase = (
  currencies: PlatformCurrencyInfo[] | undefined = []
): SelectFilterValue<string | undefined>[] => {
  return currencies.map(({ name }) => ({ value: name, label: name }));
};

export const composeCurrencyFilter = (
  currencies: string[] | undefined = []
): SelectFilterValue<string | undefined>[] => [
  { value: undefined, label: "All" },
  ...currencies.map(x => ({ value: x, label: x }))
];
