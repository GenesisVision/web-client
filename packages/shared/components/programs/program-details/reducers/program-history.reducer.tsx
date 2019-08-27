import { TradesViewModel } from "gv-api-web";
import { combineReducers } from "redux";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "shared/components/table/reducers/table.reducer";
import clearableReducer from "shared/reducers/clearable.reducer";
import { RootState } from "shared/reducers/root-reducer";

import { PROGRAM_OPEN_POSITIONS } from "../actions/program-details.actions";

const openPositionsSelector = (state: RootState) =>
  state.programDetails.programHistory.openPositions;

export const openPositionsTableSelector = tableSelectorCreator<
  RootState,
  TradesViewModel,
  TradesViewModel
>(openPositionsSelector, "trades");

export const openPositionsReducer = tableReducerFactory<TradesViewModel>({
  type: PROGRAM_OPEN_POSITIONS,
  paging: DEFAULT_PAGING
});

export type ProgramHistoryState = Readonly<{
  openPositions: ITableState<TradesViewModel>;
}>;

const programHistoryReducer = clearableReducer(
  combineReducers<ProgramHistoryState>({
    openPositions: openPositionsReducer
  })
);

export default programHistoryReducer;
