import { FilterValue } from "shared/components/table/components/filtering/filter.type";

export const composeCurrencyFilter = (
  currencies?: string[]
): FilterValue<string | undefined>[] => [
  { value: undefined, label: "All" },
  ...(currencies || []).map(x => ({ value: x, label: x }))
];
