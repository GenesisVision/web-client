import clearableReducer from "reducers/clearable.reducer";
import { combineReducers } from "redux";

import { fundEventsReducer, TFundEventsState } from "./fund-events.reducer";
import fundReallocateHistoryReducer, {
  TReallocateHistoryState
} from "./fund-reallocate-history.reducer";
import fundStructureReducer, {
  TFundStructureState
} from "./fund-structure.reducer";

export type FundHistoryState = Readonly<{
  events: TFundEventsState;
  reallocateHistory: TReallocateHistoryState;
  fundStructure: TFundStructureState;
}>;

const fundHistoryReducer = clearableReducer(
  combineReducers<FundHistoryState>({
    events: fundEventsReducer,
    reallocateHistory: fundReallocateHistoryReducer,
    fundStructure: fundStructureReducer
  })
);

export default fundHistoryReducer;
