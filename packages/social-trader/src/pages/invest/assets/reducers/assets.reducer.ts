import clearableReducer from "reducers/clearable.reducer";
import { combineReducers } from "redux";
import { ITableState } from "components/table/reducers/table.reducer";
import { CoinsAssetItemsViewModel, CoinsHistoryEventItemsViewModel } from "gv-api-web";
import {
  assetsCoinsReducer,
  assetsHistoryReducer,
  assetsPortfolioReducer
} from "pages/invest/assets/reducers/assets-tables.reducer";

type AssetsDataType = Readonly<{
  coins: ITableState<CoinsAssetItemsViewModel>;
  portfolio: ITableState<CoinsAssetItemsViewModel>;
  history: ITableState<CoinsHistoryEventItemsViewModel>;
}>;

export type AssetsState = AssetsDataType;

const assetsReducer = clearableReducer(
  combineReducers<AssetsState>({
    coins: assetsCoinsReducer,
    portfolio: assetsPortfolioReducer,
    history: assetsHistoryReducer
  })
);

export default assetsReducer;
