import AssetSettingsLoader from "modules/asset-settings/asset-settings.loader";
import AssetSettingsPage from "modules/asset-settings/asset-settings.page";
import { AssetDescriptionType } from "modules/asset-settings/asset-settings.types";
import { dispatchFundDescriptionWithId } from "pages/funds/fund-details/services/fund-details.service";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import { fundDescriptionSelector } from "shared/components/funds/fund-details/reducers/description.reducer";
import { ASSET } from "shared/constants/constants";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import {
  createFundInfoSelector,
  fundAssetsSelector
} from "shared/reducers/platform-reducer";
import { SetSubmittingType } from "shared/utils/types";

import FundSettings from "./fund-settings";
import { redirectToFund } from "./services/fund-settings.service";

const _FundSettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
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
      asset={ASSET.FUND}
      description={description as AssetDescriptionType}
      dispatchDescription={handleDispatchDescription}
      settingsBlocks={(editProgram, applyCloseAsset) => (
        <FundSettings
          createFundInfo={createFundInfo}
          reallocate={handleDispatchDescription}
          condition={!!description && !!platformAssets}
          platformAssets={platformAssets}
          closeAsset={applyCloseAsset}
          details={description!}
          editAsset={editProgram}
          loader={<AssetSettingsLoader />}
        />
      )}
    />
  );
};

export type TUpdateFundFunc = (
  values: {
    description?: string;
    logo?: IImageValue;
    investmentLimit?: number;
    stopOutLevel?: number;
    entryFee?: number;
    exitFee?: number;
  },
  setSubmitting: SetSubmittingType
) => void;

const FundSettingsPage = React.memo(_FundSettingsPage);
export default FundSettingsPage;
