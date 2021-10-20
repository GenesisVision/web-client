import FundAssetFilter, {
  IFundAssetFilterProps
} from "components/table/components/filtering/fund-asset-filter/fund-asset-filter";
import { AssetProvider } from "gv-api-web";
import { allAssetsCoinsSelector } from "pages/invest/assets/reducers/assets-tables.reducer";
import { getAllAssetsCoins } from "pages/invest/assets/service/assets.service";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export interface ICoinsAssetFilterContainerProps
  extends Omit<IFundAssetFilterProps, "values"> {}

const providerBinance = [{ type: "Binance" as AssetProvider }];

const _CoinsAssetFilterContainer: React.FC<ICoinsAssetFilterContainerProps> = props => {
  const allAssetsCoins = useSelector(allAssetsCoinsSelector);

  useEffect(() => {
    if (!allAssetsCoins.isPending && !allAssetsCoins.data) getAllAssetsCoins();
  }, [allAssetsCoins]);

  if (!allAssetsCoins.data) return null;

  return (
    <FundAssetFilter
      {...props}
      values={allAssetsCoins.data.items}
      providers={providerBinance}
    />
  );
};

export const CoinsAssetFilterContainer = React.memo(_CoinsAssetFilterContainer);
