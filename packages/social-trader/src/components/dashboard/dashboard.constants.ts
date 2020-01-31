import {
  DATA_RANGE_FILTER_TYPES,
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import { FILTER_TYPE } from "components/table/helpers/filtering.helpers";
import { ASSET } from "constants/constants";
import { MiddlewareDispatch } from "utils/types";

import {
  ACTION_STATUS_FILTER_DEFAULT_VALUE,
  ACTION_STATUS_FILTER_NAME
} from "./dashboard-assets/dashboard-programs/dashboard-programs.helpers";

export const DASHBOARD_PROGRAMS_SORTING = "ByProfitDesc";

export const DASHBOARD_PROGRAMS_FILTERS = [
  {
    type: FILTER_TYPE.GENERAL,
    name: ACTION_STATUS_FILTER_NAME,
    defaultValue: ACTION_STATUS_FILTER_DEFAULT_VALUE
  },
  {
    ...composeDefaultDateRangeFilter({
      defaultValue: {
        ...DEFAULT_DATE_RANGE_FILTER_VALUE,
        type: DATA_RANGE_FILTER_TYPES.LAST_MONTH
      }
    })
  }
];

export const DASHBOARD_PROGRAMS_DEFAULT_FILTERING = {
  [DATE_RANGE_FILTER_NAME]: {
    ...DEFAULT_DATE_RANGE_FILTER_VALUE,
    type: DATA_RANGE_FILTER_TYPES.LAST_MONTH
  },
  [ACTION_STATUS_FILTER_NAME]: ACTION_STATUS_FILTER_DEFAULT_VALUE
};

export const DASHBOARD_FUNDS_COLUMNS: SortingColumn[] = [
  {
    name: "title"
  },
  {
    name: "balance"
  },
  {
    name: "assets"
  },
  {
    name: "value"
  },
  {
    name: "drawdown"
  },
  {
    name: "profit"
  },
  {
    name: "chart"
  },
  {
    name: "status"
  }
];

export const DASHBOARD_FUNDS_FILTERS = [
  {
    type: FILTER_TYPE.GENERAL,
    name: ACTION_STATUS_FILTER_NAME,
    defaultValue: ACTION_STATUS_FILTER_DEFAULT_VALUE
  },
  {
    ...composeDefaultDateRangeFilter({
      defaultValue: {
        ...DEFAULT_DATE_RANGE_FILTER_VALUE,
        type: DATA_RANGE_FILTER_TYPES.LAST_MONTH
      }
    })
  }
];

export const DASHBOARD_FUNDS_DEFAULT_FILTERING = {
  [DATE_RANGE_FILTER_NAME]: {
    ...DEFAULT_DATE_RANGE_FILTER_VALUE,
    type: DATA_RANGE_FILTER_TYPES.LAST_MONTH
  },
  [ACTION_STATUS_FILTER_NAME]: ACTION_STATUS_FILTER_DEFAULT_VALUE
};

export type CancelRequestPropsType = {
  id: string;
  onFinally: () => void;
  removeDisableBtn: () => void;
  asset?: ASSET;
};

export type CancelRequestType = (
  props: CancelRequestPropsType
) => (dispatch: MiddlewareDispatch) => Promise<void>;
