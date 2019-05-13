import { ROLE_ENV } from "shared/constants/constants";

export enum ACTION_STATUS_FILTER_TYPES {
  ALL = "all",
  ACTIVE = "active"
}
export const ACTION_STATUS_FILTER_DEFAULT_VALUE =
  ACTION_STATUS_FILTER_TYPES.ACTIVE;
export const ACTION_STATUS_FILTER_NAME = "dashboardActionStatus";
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
