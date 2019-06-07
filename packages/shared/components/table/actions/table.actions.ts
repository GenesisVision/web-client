import { ActionType } from "shared/utils/types";

import { ComposeFiltersType } from "../components/filtering/filter.type";
import { composeFiltersActionType } from "../reducers/table-filters.reducer";

export type TTableAction = ActionType<ComposeFiltersType>;
export const updateFilters = (
  payload: ComposeFiltersType,
  actionType: string
): TTableAction => ({
  type: composeFiltersActionType(actionType),
  payload
});
