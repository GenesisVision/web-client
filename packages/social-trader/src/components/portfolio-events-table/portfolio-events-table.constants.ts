import {
  ASSET_TYPE_FILTER_DEFAULT_VALUE,
  ASSET_TYPE_FILTER_NAME
} from "components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { composeDefaultAssetTypeFilter } from "components/table/components/filtering/asset-type-filter/asset-type-filter.helpers";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import {
  EVENT_TYPE_FILTER_DEFAULT_VALUE,
  EVENT_TYPE_FILTER_NAME
} from "components/table/components/filtering/event-type-filter/event-type-filter.constants";
import { composeDefaultEventTypeFilter } from "components/table/components/filtering/event-type-filter/event-type-filter.helpers";
import {
  FilteringType,
  SortingColumn
} from "components/table/components/filtering/filter.type";
import { IComposeDefaultFilter } from "components/table/components/table.types";

export const EVENTS_ACTION_TYPE = "EVENTS_ACTION_TYPE";

export const PORTFOLIO_EVENTS_MANAGER_COLUMNS: SortingColumn[] = [
  {
    name: "date"
  },
  {
    name: "description"
  },
  {
    name: ""
  },
  {
    name: "amount"
  }
];

export const PORTFOLIO_EVENTS_COLUMNS: SortingColumn[] = [
  {
    name: "date"
  },
  {
    name: "description"
  },
  {
    name: "fee"
  },
  { name: "" },
  {
    name: "amount"
  }
];

export const DASHBOARD_PORTFOLIO_EVENTS_FILTERS: IComposeDefaultFilter[] = [
  {
    ...composeDefaultDateRangeFilter()
  },
  { ...composeDefaultAssetTypeFilter() },
  { ...composeDefaultEventTypeFilter() }
];

export const DASHBOARD_PORTFOLIO_EVENTS_DEFAULT_FILTERING: FilteringType = {
  [DATE_RANGE_FILTER_NAME]: DEFAULT_DATE_RANGE_FILTER_VALUE,
  [ASSET_TYPE_FILTER_NAME]: ASSET_TYPE_FILTER_DEFAULT_VALUE,
  [EVENT_TYPE_FILTER_NAME]: EVENT_TYPE_FILTER_DEFAULT_VALUE
};

export const ASSET_PORTFOLIO_EVENTS_FILTERS: IComposeDefaultFilter[] = [
  {
    ...composeDefaultDateRangeFilter()
  },
  { ...composeDefaultEventTypeFilter() }
];

export const ASSET_PORTFOLIO_EVENTS_DEFAULT_FILTERING: FilteringType = {
  [DATE_RANGE_FILTER_NAME]: DEFAULT_DATE_RANGE_FILTER_VALUE,
  [EVENT_TYPE_FILTER_NAME]: EVENT_TYPE_FILTER_DEFAULT_VALUE
};

export const EVENT_PROFITABILITY_VALUES: {
  [t in InvestmentEventViewModelChangeStateEnum]: string;
} = {
  Decreased: "-1",
  NotChanged: "0",
  Increased: "1"
};
export enum InvestmentEventViewModelChangeStateEnum {
  Decreased = "Decreased",
  NotChanged = "NotChanged",
  Increased = "Increased"
}
