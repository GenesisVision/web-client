import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { FILTER_TYPE } from "shared/components/table/helpers/filtering.helpers";

export const composeDefaultTransactionTypeFilter = () => ({
  name: "txAction",
  composeRequestValue: (value: any) => value,
  defaultValue: undefined,
  type: FILTER_TYPE.GENERAL
});

export const reduceFilters = (filters: any[]): SelectFilterValue[] =>
  filters.map(filter => ({ value: filter.key, label: filter.title }));
