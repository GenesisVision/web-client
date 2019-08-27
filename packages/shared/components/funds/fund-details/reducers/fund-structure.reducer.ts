import { FundAssetsListInfo } from "gv-api-web";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";
import { RootState } from "shared/reducers/root-reducer";

import { FUND_REALLOCATE_HISTORY } from "../actions/fund-details.actions";

const fundStructureSelector = (state: RootState) =>
  state.fundDetails.reallocateHistory;

export const fundStructureTableSelector = tableSelectorCreator<
  RootState,
  FundAssetsListInfo & { total: number },
  FundAssetsListInfo
>(fundStructureSelector as any, "assets");

const fundStructureReducer = tableReducerFactory<FundAssetsListInfo>({
  type: FUND_REALLOCATE_HISTORY,
  paging: {
    ...DEFAULT_PAGING,
    itemsOnPage: Number.MAX_VALUE
  },
  clearable: false,
  clearableActionType: ""
});

export default fundStructureReducer;
