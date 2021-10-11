import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import {
  CoinsAssetItemsViewModel,
  CoinsHistoryEventItemsViewModel
} from "gv-api-web";
import {
  ASSETS_COINS,
  ASSETS_FAVOURITES,
  ASSETS_HISTORY,
  ASSETS_PORTFOLIO
} from "pages/invest/assets/assets.constants";
import { api } from "services/api-client/swagger-custom-client";
import { ApiAction } from "utils/types";

export const fetchAssetsCoinsAction = (
  filters: ComposeFiltersAllType
): ApiAction<CoinsAssetItemsViewModel> => ({
  type: ASSETS_COINS,
  payload: api.coins().getCoins(filters)
});

export const fetchAssetsFavouritesAction = (
  filters: ComposeFiltersAllType
): ApiAction<CoinsAssetItemsViewModel> => ({
  type: ASSETS_FAVOURITES,
  payload: api.coins().getFavoriteCoins(filters)
});

export const fetchAssetsPortfolioAction = (
  filters: ComposeFiltersAllType
): ApiAction<CoinsAssetItemsViewModel> => ({
  type: ASSETS_PORTFOLIO,
  payload: api.coins().getUserCoins(filters)
});

export const fetchAssetsHistoryAction = (
  filters: ComposeFiltersAllType
): ApiAction<CoinsHistoryEventItemsViewModel> => ({
  type: ASSETS_HISTORY,
  payload: api.coins().getCoinsConvertingHistory(filters)
});
