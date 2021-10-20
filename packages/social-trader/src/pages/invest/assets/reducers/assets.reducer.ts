import { ITableState } from "components/table/reducers/table.reducer";
import {
  CoinsAssetItemsViewModel,
  CoinsHistoryEventItemsViewModel
} from "gv-api-web";
import {
  allAssetsCoinsReducer,
  AllAssetsCoinsState,
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
  allCoins: AllAssetsCoinsState;
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
    allCoins: allAssetsCoinsReducer,
    coins: assetsCoinsReducer,
    favourites: assetsFavouritesReducer,
    portfolio: assetsPortfolioReducer,
    portfolioShort: assetsPortfolioReducerShort,
    history: assetsHistoryReducer,
    historyShort: assetsHistoryReducerShort
  })
);

export default assetsReducer;
