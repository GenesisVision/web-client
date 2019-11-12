import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "shared/components/table/reducers/table.reducer";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

import { FUND_STRUCTURE } from "../fund-details.constants";

export type TFundStructureData = any;
export type TFundStructureState = ITableState<TFundStructureData>;

const fundStructureSelector = (state: RootState) =>
  state.fundDetails.fundHistory.fundStructure;

export const fundStructureTableSelector = tableSelectorCreator<
  RootState,
  TFundStructureData,
  TFundStructureData
>(fundStructureSelector, "assets");

const fundStructureReducer = tableReducerFactory<TFundStructureData>({
  type: FUND_STRUCTURE,
  paging: {
    ...DEFAULT_PAGING,
    itemsOnPage: Number.MAX_VALUE
  }
});

export default fundStructureReducer;
