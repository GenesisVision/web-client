import { FilterType } from "shared/components/table/helpers/filtering.helpers";

export const composeDefaultDepositsWithdrawalsTypeFilter = () => ({
  name: "txAction",
  composeRequestValue: value => value,
  defaultValue: undefined,
  type: FilterType.general
});
