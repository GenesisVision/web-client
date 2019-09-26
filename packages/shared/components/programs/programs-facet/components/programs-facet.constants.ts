import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import {
  programCurrencyFilter,
  programsDateRangeFilter
} from "shared/modules/programs-table/components/programs-table/programs.constants";

export const PROGRAMS_FACET_TABLE_FILTERS = [
  programCurrencyFilter,
  programsDateRangeFilter
];

export const PROGRAMS_FACET_PAGING = { ...DEFAULT_PAGING, itemsOnPage: 12 };
