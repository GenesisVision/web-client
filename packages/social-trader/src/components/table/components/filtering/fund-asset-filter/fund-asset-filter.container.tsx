import FundAssetFilter, {
  IFundAssetFilterProps
} from "components/table/components/filtering/fund-asset-filter/fund-asset-filter";
import useApiRequest from "hooks/api-request.hook";
import { getTradingAssets } from "pages/invest/funds/fund-settings/reallocation/services/reallocate.services";
import React from "react";

export interface IFundAssetFilterContainerProps extends IFundAssetFilterProps {}

const _FundAssetFilterContainer: React.FC<IFundAssetFilterContainerProps> = props => {
  const { data: platformAssets } = useApiRequest({
    name: "FundAssetFilterContainer",
    cache: true,
    request: getTradingAssets,
    fetchOnMount: true
  });

  if (!platformAssets) return null;
  const { assets, providers } = platformAssets;

  return <FundAssetFilter {...props} values={assets} providers={providers} />;
};

export const FundAssetFilterContainer = React.memo(_FundAssetFilterContainer);
