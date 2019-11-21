import { SelectFilterValue } from "components/table/components/filtering/filter.type";

export const composeTypeFilter = (
  types: string[] | undefined = []
): SelectFilterValue<string | undefined>[] => [
  { value: undefined, label: "All" },
  ...types.map(x => ({ value: x, label: x }))
];
