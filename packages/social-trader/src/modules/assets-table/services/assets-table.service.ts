import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { api } from "services/api-client/swagger-custom-client";
import { CoinsAssetResponseItemsViewModel }  from "gv-api-web";

export const fetchCoins = (
  filters: ComposeFiltersAllType
): Promise<CoinsAssetResponseItemsViewModel> => {
  return api.coins().getCoins(filters);
};
