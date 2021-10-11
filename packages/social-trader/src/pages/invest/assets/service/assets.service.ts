import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import {
  fetchAssetsCoinsAction,
  fetchAssetsFavouritesAction,
  fetchAssetsHistoryAction,
  fetchAssetsPortfolioAction
} from "pages/invest/assets/actions/assets.actions";

export const getAssetsCoins = () => (filters: ComposeFiltersAllType) => {
  return fetchAssetsCoinsAction(filters);
};

export const getAssetsFavourites = () => (filters: ComposeFiltersAllType) => {
  return fetchAssetsFavouritesAction(filters);
};

export const getAssetsPortfolio = () => (filters: ComposeFiltersAllType) => {
  return fetchAssetsPortfolioAction(filters);
};

export const getAssetsHistory = () => (filters: ComposeFiltersAllType) => {
  return fetchAssetsHistoryAction(filters);
};
