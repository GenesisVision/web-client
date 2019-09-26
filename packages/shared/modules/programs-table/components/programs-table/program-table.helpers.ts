import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";

export const composeCurrencyFilter = (
  currencies?: string[]
): SelectFilterValue<string | undefined>[] => [
  { value: undefined, label: "Base" },
  ...(currencies || []).map(x => ({ value: x, label: x }))
];
