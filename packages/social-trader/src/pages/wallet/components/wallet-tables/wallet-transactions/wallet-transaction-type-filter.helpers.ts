import { SelectFilterValue } from "components/table/components/filtering/filter.type";

export const reduceFilters = (filters: any[]): SelectFilterValue[] =>
  filters.map(filter => ({ value: filter.key, label: filter.title }));
