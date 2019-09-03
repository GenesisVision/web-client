import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { fundCurrencyFilter } from "shared/modules/funds-table/components/funds-table/funds-table.constants";
import { programsDateRangeFilter } from "shared/modules/programs-table/components/programs-table/programs.constants";

export const FUNDS_FACET_TABLE_FILTERS = [
  fundCurrencyFilter,
  programsDateRangeFilter
];

export const FUNDS_FACET_PAGING = { ...DEFAULT_PAGING, itemsOnPage: 12 };
