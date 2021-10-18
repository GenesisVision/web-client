import FundAssetFilter, {
  IFundAssetFilterProps
} from "components/table/components/filtering/fund-asset-filter/fund-asset-filter";
import useApiRequest from "hooks/api-request.hook";
import { fetchAssetsCoins } from "pages/invest/assets/actions/assets.actions";
import { getTradingAssets } from "pages/invest/funds/fund-settings/reallocation/services/reallocate.services";
import React from "react";

export interface ICoinsAssetFilterContainerProps
  extends Omit<IFundAssetFilterProps, "values"> {}

const _CoinsAssetFilterContainer: React.FC<ICoinsAssetFilterContainerProps> = props => {
  const { data: coins } = useApiRequest({
    name: "CoinsAssetFilterContainer",
    cache: true,
    request: fetchAssetsCoins,
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

  const values = assets.filter(asset =>
    coins.items.find(coin => coin.id === asset.id)
  );

  return <FundAssetFilter {...props} values={values} providers={providers} />;
};

export const CoinsAssetFilterContainer = React.memo(_CoinsAssetFilterContainer);
