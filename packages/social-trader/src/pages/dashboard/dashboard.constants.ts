import {
  ACTION_STATUS_FILTER_DEFAULT_VALUE,
  ACTION_STATUS_FILTER_NAME
} from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import { FILTER_TYPE } from "shared/components/table/helpers/filtering.helpers";

export const DASHBOARD_PUBLIC_FILTERING = {
  [ACTION_STATUS_FILTER_NAME]: ACTION_STATUS_FILTER_DEFAULT_VALUE
};

export const DASHBOARD_PUBLIC_DEFAULT_FILTERS = [
  {
    type: FILTER_TYPE.GENERAL,
    name: ACTION_STATUS_FILTER_NAME,
    defaultValue: ACTION_STATUS_FILTER_DEFAULT_VALUE
  }
];
