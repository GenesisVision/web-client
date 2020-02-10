import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "components/table/reducers/table.reducer";
import { FundAssetInfo } from "gv-api-web";
import {
  FundDescriptionDataType,
  fundDescriptionSelector
} from "pages/invest/funds/fund-details/reducers/description.reducer";
import { RootState } from "reducers/root-reducer";
import { apiFieldSelector, fieldSelector } from "utils/selectors";

import { FUND_STRUCTURE } from "../fund-details.constants";

export type TFundStructureData = any;
export type TFundStructureState = ITableState<TFundStructureData>;

export const fundStructureTableSelector = apiFieldSelector<
  FundDescriptionDataType,
  FundAssetInfo[],
  RootState
>(
  fundDescriptionSelector,
  fieldSelector(state => state.assetsStructure),
  []
);

const fundStructureReducer = tableReducerFactory<TFundStructureData>({
  type: FUND_STRUCTURE,
  paging: {
    ...DEFAULT_PAGING,
    itemsOnPage: Number.MAX_VALUE
  }
});

export default fundStructureReducer;
