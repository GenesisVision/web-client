import { IImageValue } from "components/form/input-image/input-image";
import { useAccountCurrency } from "hooks/account-currency.hook";
import AssetSettingsPage from "modules/asset-settings/asset-settings.page";
import { AssetDescriptionType } from "modules/asset-settings/asset-settings.types";
import { CLOSEABLE_ASSET } from "modules/asset-settings/close-asset/close-asset";
import { fundDescriptionSelector } from "pages/invest/funds/fund-details/reducers/description.reducer";
import { dispatchFundDescriptionWithId } from "pages/invest/funds/fund-details/services/fund-details.service";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createFundInfoSelector,
  fundAssetsSelector
} from "reducers/platform-reducer";

import FundSettings from "./fund-settings";
import { redirectToFund } from "./services/fund-settings.service";

const _FundSettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const currency = useAccountCurrency();
  const createFundInfo = useSelector(createFundInfoSelector);
  const description = useSelector(fundDescriptionSelector);
  const platformAssets = useSelector(fundAssetsSelector);
  const handleDispatchDescription = useCallback(() => {
    dispatch(
      dispatchFundDescriptionWithId(description!.id, undefined, currency)
    );
  }, []);
  return (
    <AssetSettingsPage
      redirectToAsset={redirectToFund}
      asset={CLOSEABLE_ASSET.FUND}
      description={description as AssetDescriptionType}
      dispatchDescription={handleDispatchDescription}
      settingsBlocks={(editProgram, applyCloseAsset) => (
        <FundSettings
          updateDescription={handleDispatchDescription}
          createFundInfo={createFundInfo}
          reallocate={handleDispatchDescription}
          condition={!!description && !!platformAssets}
          platformAssets={platformAssets}
          closeAsset={applyCloseAsset}
          details={description!}
          editAsset={editProgram}
        />
      )}
    />
  );
};

export type TUpdateFundFunc = (values: {
  description?: string;
  logo?: IImageValue;
  investmentLimit?: number;
  stopOutLevel?: number;
  entryFee?: number;
  exitFee?: number;
}) => void;

const FundSettingsPage = React.memo(_FundSettingsPage);
export default FundSettingsPage;
