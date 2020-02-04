import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { fundCurrencyMap } from "modules/funds-table/components/funds-table/funds-table.constants";
import { programsDateRangeFilter } from "modules/programs-table/components/programs-table/programs.constants";

export const FUNDS_FACET_TABLE_FILTERS = [
  fundCurrencyMap,
  programsDateRangeFilter
];

export const FUNDS_FACET_PAGING = { ...DEFAULT_PAGING, itemsOnPage: 12 };
