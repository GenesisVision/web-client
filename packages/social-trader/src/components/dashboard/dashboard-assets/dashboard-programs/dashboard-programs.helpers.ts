export enum ACTION_STATUS_FILTER_TYPES {
  ALL = "all",
  ACTIVE = "active"
}
export const ACTION_STATUS_FILTER_DEFAULT_VALUE =
  ACTION_STATUS_FILTER_TYPES.ACTIVE;
export const ACTION_STATUS_FILTER_NAME = "status";
export const ACTION_STATUS_FILTER_VALUES = [
  {
    value: ACTION_STATUS_FILTER_TYPES.ALL,
    labelKey: `actions-status-filter.values.all` // TODO remove after union
  },
  {
    value: ACTION_STATUS_FILTER_TYPES.ACTIVE,
    labelKey: `actions-status-filter.values.active` // TODO remove after union
  }
];
