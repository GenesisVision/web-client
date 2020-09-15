import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import { FILTER_TYPE } from "components/table/helpers/filtering.helpers";
import { DEFAULT_EVENTS_PAGING } from "components/table/reducers/table-paging.reducer";
import {
  SERVER_DATE_RANGE_MAX_FILTER_NAME,
  SERVER_DATE_RANGE_MIN_FILTER_NAME
} from "pages/invest/programs/program-details/program-details.constants";
import {
  INTERVAL_FILTER_NAME,
  INTERVAL_FILTER_VALUES
} from "pages/invest/programs/program-details/program-history-section/interval-filter";

export const REPORTS_TABLE_COLUMNS: SortingColumn[] = [
  { name: "dateFrom" },
  { name: "periodLength" },
  { name: "balance" },
  { name: "profit" },
  { name: "fees" },
  { name: "deposit-withdraw" }
];

export const REPORTS_TABLE_DEFAULT_FILTERS = [
  {
    name: INTERVAL_FILTER_NAME,
    type: FILTER_TYPE.GENERAL
  },
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValueFunc(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    })
  }
];

export const REPORTS_TABLE_FILTERS = {
  [INTERVAL_FILTER_NAME]: INTERVAL_FILTER_VALUES[0].value,
  [DATE_RANGE_FILTER_NAME]: DEFAULT_DATE_RANGE_FILTER_VALUE
};

export const REPORTS_TABLE_PAGING = DEFAULT_EVENTS_PAGING;
