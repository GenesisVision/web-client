import { tableSelectorCreator } from "components/table/helpers/table.selector";
import {
  DEFAULT_PAGING
} from "components/table/reducers/table-paging.reducer";
import tableReducerFactory from "components/table/reducers/table.reducer";
import { RootState } from "reducers/root-reducer";

import { ASSETS_COINS, ASSETS_HISTORY, ASSETS_PORTFOLIO } from "pages/invest/assets/assets.constants";
import { CoinsAssetItemsViewModel, CoinsHistoryEventItemsViewModel } from "gv-api-web";

export const assetsCoinsSelector = (state: RootState) =>
  state.assets.coins;

export const assetsCoinsTableSelector = tableSelectorCreator<
  RootState,
  CoinsAssetItemsViewModel,
  CoinsAssetItemsViewModel
  >(assetsCoinsSelector);

export const assetsCoinsReducer = tableReducerFactory<CoinsAssetItemsViewModel>({
  type: ASSETS_COINS,
  paging: { ...DEFAULT_PAGING, itemsOnPage: 12 }
});

export const assetsPortfolioSelector = (state: RootState) =>
  state.assets.portfolio;

export const assetsPortfolioTableSelector = tableSelectorCreator<
  RootState,
  CoinsAssetItemsViewModel,
  CoinsAssetItemsViewModel
  >(assetsPortfolioSelector);

export const assetsPortfolioReducer = tableReducerFactory<CoinsAssetItemsViewModel>({
  type: ASSETS_PORTFOLIO,
  paging: { ...DEFAULT_PAGING, itemsOnPage: Number.MAX_VALUE }
});

export const assetsHistorySelector = (state: RootState) =>
  state.assets.history;

export const assetsHistoryTableSelector = tableSelectorCreator<
  RootState,
  CoinsHistoryEventItemsViewModel,
  CoinsHistoryEventItemsViewModel
  >(assetsHistorySelector);

export const assetsHistoryReducer = tableReducerFactory<CoinsHistoryEventItemsViewModel>({
  type: ASSETS_HISTORY,
  paging: { ...DEFAULT_PAGING, itemsOnPage: Number.MAX_VALUE }
});
