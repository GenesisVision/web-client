import FundAssetFilter, {
  IFundAssetFilterProps
} from "components/table/components/filtering/fund-asset-filter/fund-asset-filter";
import useApiRequest from "hooks/api-request.hook";
import React from "react";
import { api } from "services/api-client/swagger-custom-client";
import { getTradingAssets } from "pages/invest/funds/fund-settings/reallocation/services/reallocate.services";

export interface ICoinsAssetFilterContainerProps extends Omit<IFundAssetFilterProps, 'values'> {}

const _CoinsAssetFilterContainer: React.FC<ICoinsAssetFilterContainerProps> = props => {
  const { data: coins } = useApiRequest({
    request: () => api.coins().getCoins(),
    fetchOnMount: true
  });

  const { data: platformAssets } = useApiRequest({
    name: "FundAssetFilterContainer",
    cache: true,
    request: getTradingAssets,
    fetchOnMount: true
  });

  if (!platformAssets || !coins) return null;
  const { assets, providers } = platformAssets;

  const values = assets.filter(asset => coins.items.find(coin => coin.id === asset.id));

  return <FundAssetFilter {...props} values={values} providers={providers} />;
};

export const CoinsAssetFilterContainer = React.memo(_CoinsAssetFilterContainer);
