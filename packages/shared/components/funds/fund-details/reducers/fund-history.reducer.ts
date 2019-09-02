import { FundAssetsListInfo, ReallocationsViewModel } from "gv-api-web";
import { combineReducers } from "redux";
import { ITableState } from "shared/components/table/reducers/table.reducer";
import clearableReducer from "shared/reducers/clearable.reducer";

import fundReallocateHistoryReducer from "./fund-reallocate-history.reducer";
import fundStructureReducer from "./fund-structure.reducer";

export type FundAssetsViewModel = FundAssetsListInfo & { total: number };

export type FundHistoryState = Readonly<{
  reallocateHistory: ITableState<ReallocationsViewModel>;
  fundStructure: ITableState<FundAssetsViewModel>;
}>;

const fundHistoryReducer = clearableReducer(
  combineReducers<FundHistoryState>({
    reallocateHistory: fundReallocateHistoryReducer,
    fundStructure: fundStructureReducer
  })
);

export default fundHistoryReducer;
