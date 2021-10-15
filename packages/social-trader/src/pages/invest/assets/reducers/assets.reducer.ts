import { ITableState } from "components/table/reducers/table.reducer";
import {
  CoinsAssetItemsViewModel,
  CoinsHistoryEventItemsViewModel
} from "gv-api-web";
import {
  assetsCoinsReducer,
  assetsFavouritesReducer,
  assetsHistoryReducer,
  assetsHistoryReducerShort,
  assetsPortfolioReducer,
  assetsPortfolioReducerShort
} from "pages/invest/assets/reducers/assets-tables.reducer";
import clearableReducer from "reducers/clearable.reducer";
import { combineReducers } from "redux";

type AssetsDataType = Readonly<{
  coins: ITableState<CoinsAssetItemsViewModel>;
  favourites: ITableState<CoinsAssetItemsViewModel>;
  portfolio: ITableState<CoinsAssetItemsViewModel>;
  portfolioShort: ITableState<CoinsAssetItemsViewModel>;
  history: ITableState<CoinsHistoryEventItemsViewModel>;
  historyShort: ITableState<CoinsHistoryEventItemsViewModel>;
}>;

export type AssetsState = AssetsDataType;

const assetsReducer = clearableReducer(
  combineReducers<AssetsState>({
    coins: assetsCoinsReducer,
    favourites: assetsFavouritesReducer,
    portfolio: assetsPortfolioReducer,
    portfolioShort: assetsPortfolioReducerShort,
    history: assetsHistoryReducer,
    historyShort: assetsHistoryReducerShort
  })
);

export default assetsReducer;
