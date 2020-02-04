import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import {
  programsCurrencyMap,
  programsDateRangeFilter
} from "modules/programs-table/components/programs-table/programs.constants";

export const PROGRAMS_FACET_TABLE_FILTERS = [
  programsCurrencyMap,
  programsDateRangeFilter
];

export const PROGRAMS_FACET_PAGING = { ...DEFAULT_PAGING, itemsOnPage: 12 };
