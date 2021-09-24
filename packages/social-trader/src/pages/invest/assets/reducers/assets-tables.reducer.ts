import { tableSelectorCreator } from "components/table/helpers/table.selector";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory from "components/table/reducers/table.reducer";
import { RootState } from "reducers/root-reducer";

import {
  ASSETS_COINS,
  ASSETS_HISTORY,
  ASSETS_HISTORY_DEFAULT_FILTERS,
  ASSETS_HISTORY_FILTERS,
  ASSETS_PORTFOLIO, ASSETS_SORTING_DEFAULT
} from "pages/invest/assets/assets.constants";
import {
  CoinsAssetItemsViewModel,
  CoinsHistoryEventItemsViewModel
} from "gv-api-web";
import { IDataModel } from "constants/constants";

const defaultData: IDataModel = { items: null, total: 0 };

export const assetsCoinsSelector = (state: RootState) => state.assets.coins;

export const assetsCoinsTableSelector = tableSelectorCreator<
  RootState,
  CoinsAssetItemsViewModel,
  CoinsAssetItemsViewModel
>(assetsCoinsSelector, "items", defaultData);

export const assetsCoinsReducer = tableReducerFactory<CoinsAssetItemsViewModel>(
  {
    type: ASSETS_COINS,
    sorting: ASSETS_SORTING_DEFAULT,
    paging: { ...DEFAULT_PAGING, itemsOnPage: 12 }
  }
);

export const assetsPortfolioSelector = (state: RootState) =>
  state.assets.portfolio;

export const assetsPortfolioTableSelector = tableSelectorCreator<
  RootState,
  CoinsAssetItemsViewModel,
  CoinsAssetItemsViewModel
>(assetsPortfolioSelector, "items", defaultData);

export const assetsPortfolioReducer = tableReducerFactory<CoinsAssetItemsViewModel>(
  {
    type: ASSETS_PORTFOLIO,
    paging: { ...DEFAULT_PAGING, itemsOnPage: 12 }
  }
);

export const assetsHistorySelector = (state: RootState) => state.assets.history;

export const assetsHistoryTableSelector = tableSelectorCreator<
  RootState,
  CoinsHistoryEventItemsViewModel,
  CoinsHistoryEventItemsViewModel
>(assetsHistorySelector, "items", defaultData);

export const assetsHistoryReducer = tableReducerFactory<CoinsHistoryEventItemsViewModel>(
  {
    type: ASSETS_HISTORY,
    paging: { ...DEFAULT_PAGING, itemsOnPage: 12 },
    filtering: ASSETS_HISTORY_FILTERS,
    defaultFilters: ASSETS_HISTORY_DEFAULT_FILTERS
  }
);
