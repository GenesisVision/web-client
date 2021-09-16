import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { CoinsAssetResponseItemsViewModel } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const fetchCoins = (
  filters: ComposeFiltersAllType
): Promise<CoinsAssetResponseItemsViewModel> => {
  return api.coins().getCoins(filters);
};

export const fetchPortfolioCoins = (
  filters: ComposeFiltersAllType
): Promise<CoinsAssetResponseItemsViewModel> => {
  return api.coins().getUserCoins(filters);
};
