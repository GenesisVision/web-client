import { FundDetailsFull, PlatformAsset } from "gv-api-web";
import AssetSettingsLoader from "modules/asset-settings/asset-settings.loader";
import AssetSettingsPage from "modules/asset-settings/asset-settings.page";
import { AssetDescriptionType } from "modules/asset-settings/asset-settings.types";
import { programEditSignal } from "modules/program-signal/program-edit-signal/services/program-edit-signal.service";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import { fundDescriptionSelector } from "shared/components/funds/fund-details/reducers/description.reducer";
import { dispatchFundDescription } from "shared/components/funds/fund-details/services/fund-details.service";
import { ASSET } from "shared/constants/constants";
import { fundAssetsSelector } from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { SetSubmittingType } from "shared/utils/types";

import FundSettings from "./fund-settings";
import { redirectToFund } from "./services/fund-settings.service";

const _FundSettingsPage: React.FC<Props> = ({
  platformAssets,
  service: {
    programEditSignal,
    changeBrokerMethod,
    cancelChangeBrokerMethod,
    dispatchDescription
  },
  t,
  description
}) => {
  const reallocate = useCallback(
    () => {
      dispatchDescription();
    },
    [dispatchDescription]
  );
  return (
    <AssetSettingsPage
      redirectToAsset={redirectToFund}
      asset={ASSET.FUND}
      description={description as AssetDescriptionType}
      dispatchDescription={dispatchFundDescription}
      settingsBlocks={(editProgram, applyCloseAsset) => (
        <FundSettings
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

const mapStateToProps = (state: RootState): StateProps => ({
  description: fundDescriptionSelector(state),
  platformAssets: fundAssetsSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchDescription: dispatchFundDescription,
      programEditSignal
    },
    dispatch
  )
});

export type TUpdateProgramFunc = (
  values: {
    description?: string;
    logo?: IImageValue;
    investmentLimit?: number;
    stopOutLevel?: number;
  },
  setSubmitting: SetSubmittingType
) => void;

interface OwnProps {}

interface StateProps {
  platformAssets: PlatformAsset[];
  description?: FundDetailsFull;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchDescription: typeof dispatchFundDescription;
  programEditSignal: typeof programEditSignal;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, DispatchProps, WithTranslation, StateProps {}

const FundSettingsPage = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_FundSettingsPage);
export default FundSettingsPage;
