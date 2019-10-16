import AssetSettingsLoader from "modules/asset-settings/asset-settings.loader";
import AssetSettingsPage from "modules/asset-settings/asset-settings.page";
import { AssetDescriptionType } from "modules/asset-settings/asset-settings.types";
import { programEditSignal } from "modules/program-signal/program-edit-signal/services/program-edit-signal.service";
import React, { useCallback } from "react";
import { withTranslation as translate } from "react-i18next";
import { ResolveThunks, connect, useSelector } from "react-redux";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators, compose } from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import { fundDescriptionSelector } from "shared/components/funds/fund-details/reducers/description.reducer";
import { dispatchFundDescription } from "shared/components/funds/fund-details/services/fund-details.service";
import { ASSET } from "shared/constants/constants";
import { fundAssetsSelector, programsInfoSelector } from "shared/reducers/platform-reducer";
import { SetSubmittingType } from "shared/utils/types";

import FundSettings from "./fund-settings";
import { redirectToFund } from "./services/fund-settings.service";

const _FundSettingsPage: React.FC<Props> = ({
  service: {
    programEditSignal,
    changeBrokerMethod,
    cancelChangeBrokerMethod,
    dispatchDescription
  }
}) => {
  const programsInfo = useSelector(programsInfoSelector);
  const description = useSelector(fundDescriptionSelector);
  const platformAssets = useSelector(fundAssetsSelector);
  const reallocate = useCallback(() => {
    dispatchDescription();
  }, []);
  return (
    <AssetSettingsPage
      redirectToAsset={redirectToFund}
      asset={ASSET.FUND}
      description={description as AssetDescriptionType}
      dispatchDescription={dispatchFundDescription}
      settingsBlocks={(editProgram, applyCloseAsset) => (
        <FundSettings
          programsInfo={programsInfo}
          reallocate={reallocate}
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchDescription: dispatchFundDescription,
      programEditSignal
    },
    dispatch
  )
});

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

interface OwnProps {}

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchDescription: typeof dispatchFundDescription;
  programEditSignal: typeof programEditSignal;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, DispatchProps {}

const FundSettingsPage = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_FundSettingsPage);
export default FundSettingsPage;
