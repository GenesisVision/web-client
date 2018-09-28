import { FilterType } from "modules/table/helpers/filtering.helpers";

export const composeDefaultTransactionTypeFilter = () => ({
  name: "txAction",
  composeRequestValue: value => value,
  defaultValue: undefined,
  type: FilterType.general
});
