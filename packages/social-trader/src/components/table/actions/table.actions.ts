import { ActionType } from "utils/types";

import { ComposeFiltersType } from "../components/filtering/filter.type";
import { composeFiltersActionType } from "../reducers/table-filters.reducer";

export type TTableAction = ActionType<ComposeFiltersType>;
export const updateFiltersAction = (
  actionType: string,
  payload?: ComposeFiltersType
): TTableAction => ({
  type: composeFiltersActionType(actionType),
  payload
});
