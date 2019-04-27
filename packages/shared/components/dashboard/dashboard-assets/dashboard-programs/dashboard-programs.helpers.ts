import { ROLE_ENV } from "../../../../constants/constants";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "../../../table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "../../../table/components/filtering/event-type-filter/event-type-filter.constants";

export enum ACTION_STATUS_FILTER_TYPES {
  ALL = "all",
  ACTIVE = "active"
}
export const ACTION_STATUS_FILTER_DEFAULT_VALUE =
  ACTION_STATUS_FILTER_TYPES.ALL;
export const ACTION_STATUS_FILTER_NAME = "actionStatus";
export const ACTION_STATUS_FILTER_VALUES = [
  {
    value: ACTION_STATUS_FILTER_TYPES.ALL,
    labelKey: `${ROLE_ENV}.dashboard-page.actions-status-filter.values.all`
  },
  {
    value: ACTION_STATUS_FILTER_TYPES.ACTIVE,
    labelKey: `${ROLE_ENV}.dashboard-page.actions-status-filter.values.active`
  }
];
