import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { CoinsAssetItemsViewModel, InternalTransferRequest } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const fetchCoins = (
  filters: ComposeFiltersAllType
): Promise<CoinsAssetItemsViewModel> => {
  return api.coins().getCoins(filters);
};

export const fetchPortfolioCoins = (
  filters: ComposeFiltersAllType
): Promise<CoinsAssetItemsViewModel> => {
  return api.coins().getUserCoins(filters);
};

export const transferCoins = (body: InternalTransferRequest): Promise<any> =>
  api.coins().transfer({
    body
  });
