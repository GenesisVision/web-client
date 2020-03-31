import {
  TableViewDataType,
  UPDATE_GLOBAL_TABLE_VIEW_ACTION,
  UpdateTableViewActionType
} from "reducers/tables-view-reducer";

export const updateGlobalTableViewAction = (
  view: TableViewDataType
): UpdateTableViewActionType => ({
  type: UPDATE_GLOBAL_TABLE_VIEW_ACTION,
  payload: { view }
});
