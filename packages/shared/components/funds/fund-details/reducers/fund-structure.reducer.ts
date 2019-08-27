import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";
import { RootState } from "shared/reducers/root-reducer";

import { FUND_STRUCTURE } from "../actions/fund-details.actions";
import { FundAssetsViewModel } from "./fund-history.reducer";

const fundStructureSelector = (state: RootState) =>
  state.fundDetails.fundHistory.fundStructure;

export const fundStructureTableSelector = tableSelectorCreator<
  RootState,
  FundAssetsViewModel,
  FundAssetsViewModel
>(fundStructureSelector, "assets");

const fundStructureReducer = tableReducerFactory<FundAssetsViewModel>({
  type: FUND_STRUCTURE,
  paging: {
    ...DEFAULT_PAGING,
    itemsOnPage: Number.MAX_VALUE
  }
});

export default fundStructureReducer;
