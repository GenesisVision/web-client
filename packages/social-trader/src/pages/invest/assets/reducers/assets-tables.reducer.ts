import { tableSelectorCreator } from "components/table/helpers/table.selector";
import tableReducerFactory from "components/table/reducers/table.reducer";
import {
  DEFAULT_CARD_PAGING,
  DEFAULT_PAGING
} from "components/table/reducers/table-paging.reducer";
import { IDataModel } from "constants/constants";
import {
  BasePlatformAssetItemsViewModel,
  CoinsAssetItemsViewModel,
  CoinsHistoryEventItemsViewModel
} from "gv-api-web";
import {
  ALL_ASSETS_COINS,
  ASSETS_COINS,
  ASSETS_DEFAULT_FILTERS,
  ASSETS_FAVOURITES,
  ASSETS_FILTERS,
  ASSETS_HISTORY,
  ASSETS_HISTORY_DEFAULT_FILTERS,
  ASSETS_HISTORY_FILTERS,
  ASSETS_PORTFOLIO,
  ASSETS_SORTING_DEFAULT
} from "pages/invest/assets/assets.constants";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";

const defaultData: IDataModel = { items: null, total: 0 };

export const assetsCoinsSelector = (state: RootState) => state.assets.coins;

export const assetsCoinsTableSelector = tableSelectorCreator<
  RootState,
  CoinsAssetItemsViewModel,
  CoinsAssetItemsViewModel
>(assetsCoinsSelector, "items", defaultData);

const assetsCoinsOptions = {
  paging: DEFAULT_CARD_PAGING,
  filtering: ASSETS_FILTERS,
  defaultFilters: ASSETS_DEFAULT_FILTERS
};

const assetsCoinsReducerOptions = {
  type: ASSETS_COINS,
  sorting: ASSETS_SORTING_DEFAULT,
  ...assetsCoinsOptions
};

export const assetsCoinsReducer = tableReducerFactory<CoinsAssetItemsViewModel>(
  assetsCoinsReducerOptions
);

export const assetsFavouritesSelector = (state: RootState) =>
  state.assets.favourites;

export const assetsFavouritesTableSelector = tableSelectorCreator<
  RootState,
  CoinsAssetItemsViewModel,
  CoinsAssetItemsViewModel
>(assetsFavouritesSelector, "items", defaultData);

export const assetsFavouritesReducer = tableReducerFactory<CoinsAssetItemsViewModel>(
  {
    ...assetsCoinsReducerOptions,
    type: ASSETS_FAVOURITES
  }
);

export const assetsPortfolioSelector = (state: RootState) =>
  state.assets.portfolio;

export const assetsPortfolioTableSelector = tableSelectorCreator<
  RootState,
  CoinsAssetItemsViewModel,
  CoinsAssetItemsViewModel
>(assetsPortfolioSelector, "items", defaultData);

const assetsPortfolioReducerOptions = {
  type: ASSETS_PORTFOLIO,
  ...assetsCoinsOptions
};

export const assetsPortfolioReducer = tableReducerFactory<CoinsAssetItemsViewModel>(
  assetsPortfolioReducerOptions
);

export const assetsPortfolioSelectorShort = (state: RootState) =>
  state.assets.portfolioShort;

export const assetsPortfolioTableSelectorShort = tableSelectorCreator<
  RootState,
  CoinsAssetItemsViewModel,
  CoinsAssetItemsViewModel
>(assetsPortfolioSelectorShort, "items", defaultData);

export const assetsPortfolioReducerShort = tableReducerFactory<CoinsAssetItemsViewModel>(
  {
    ...assetsPortfolioReducerOptions,
    paging: { ...DEFAULT_PAGING, itemsOnPage: 5 }
  }
);

export const assetsHistorySelector = (state: RootState) => state.assets.history;

export const assetsHistoryTableSelector = tableSelectorCreator<
  RootState,
  CoinsHistoryEventItemsViewModel,
  CoinsHistoryEventItemsViewModel
>(assetsHistorySelector, "items", defaultData);

const assetsHistoryReducerOptions = {
  type: ASSETS_HISTORY,
  paging: DEFAULT_CARD_PAGING,
  filtering: ASSETS_HISTORY_FILTERS,
  defaultFilters: ASSETS_HISTORY_DEFAULT_FILTERS
};

export const assetsHistoryReducer = tableReducerFactory<CoinsHistoryEventItemsViewModel>(
  assetsHistoryReducerOptions
);

export const assetsHistorySelectorShort = (state: RootState) =>
  state.assets.historyShort;

export const assetsHistoryTableSelectorShort = tableSelectorCreator<
  RootState,
  CoinsHistoryEventItemsViewModel,
  CoinsHistoryEventItemsViewModel
>(assetsHistorySelectorShort, "items", defaultData);

export const assetsHistoryReducerShort = tableReducerFactory<CoinsHistoryEventItemsViewModel>(
  {
    ...assetsHistoryReducerOptions,
    paging: { ...DEFAULT_PAGING, itemsOnPage: 5 }
  }
);

export type AllAssetsCoinsType = BasePlatformAssetItemsViewModel;

export type AllAssetsCoinsState = IApiState<AllAssetsCoinsType>;

export const allAssetsCoinsSelector = (state: RootState) =>
  state.assets.allCoins;

export const allAssetsCoinsReducer = apiReducerFactory<AllAssetsCoinsType>({
  apiType: ALL_ASSETS_COINS
});
