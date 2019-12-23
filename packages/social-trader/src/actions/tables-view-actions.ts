import {
  TableViewDataType,
  UPDATE_FUNDS_TABLE_VIEW_ACTION,
  UPDATE_GLOBAL_TABLE_VIEW_ACTION,
  UPDATE_PROGRAMS_TABLE_VIEW_ACTION,
  UpdateTableViewActionType
} from "reducers/tables-view-reducer";

export const updateGlobalTableViewAction = (
  view: TableViewDataType
): UpdateTableViewActionType => ({
  type: UPDATE_GLOBAL_TABLE_VIEW_ACTION,
  payload: { view }
});

export const updateProgramsTableViewAction = (
  view: TableViewDataType
): UpdateTableViewActionType => ({
  type: UPDATE_PROGRAMS_TABLE_VIEW_ACTION,
  payload: { view }
});

export const updateFundsTableViewAction = (
  view: TableViewDataType
): UpdateTableViewActionType => ({
  type: UPDATE_FUNDS_TABLE_VIEW_ACTION,
  payload: { view }
});
