import { LIST_VIEW } from "components/table/table.constants";
import { combineReducers } from "redux";
import { fieldSelector } from "utils/selectors";
import { ActionType } from "utils/types";

import defaultReducer from "./reducer-creators/default-reducer";

export const GLOBAL_TABLE_VIEW = "globalTableView";

export const UPDATE_GLOBAL_TABLE_VIEW_ACTION =
  "UPDATE_GLOBAL_TABLE_VIEW_ACTION";

const initialState: TableViewState = { view: LIST_VIEW.CARDS };

export type TableViewDataType = LIST_VIEW;
export type TableViewState = { view: TableViewDataType };
export type UpdateTableViewActionType = ActionType<TableViewState>;

const globalTableViewReducer = (
  state = initialState,
  action: UpdateTableViewActionType
): TableViewState =>
  defaultReducer<UpdateTableViewActionType, TableViewState>(
    action,
    state,
    initialState,
    UPDATE_GLOBAL_TABLE_VIEW_ACTION
  );

export const globalTableViewSelector = fieldSelector(
  state => state.tablesView[GLOBAL_TABLE_VIEW].view
);

export type TablesViewState = {
  [GLOBAL_TABLE_VIEW]: TableViewState;
};

const tablesViewReducer = combineReducers<TablesViewState>({
  [GLOBAL_TABLE_VIEW]: globalTableViewReducer
});

export default tablesViewReducer;
