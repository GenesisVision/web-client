import fundHistoryTableReducer, {
  THistoryTableState
} from "pages/invest/funds/fund-details/reducers/fund-history-table.reducer";
import clearableReducer from "reducers/clearable.reducer";
import { combineReducers } from "redux";

import { fundEventsReducer, TFundEventsState } from "./fund-events.reducer";
import fundStructureReducer, {
  TFundStructureState
} from "./fund-structure.reducer";

export type FundHistoryState = Readonly<{
  historyTable: THistoryTableState;
  events: TFundEventsState;
  fundStructure: TFundStructureState;
}>;

const fundHistoryReducer = clearableReducer(
  combineReducers<FundHistoryState>({
    events: fundEventsReducer,
    historyTable: fundHistoryTableReducer,
    fundStructure: fundStructureReducer
  })
);

export default fundHistoryReducer;
