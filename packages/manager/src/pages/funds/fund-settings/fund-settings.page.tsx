import { ProgramDetailsFull } from "gv-api-web";
import AssetSettingsLoader from "modules/asset-settings/asset-settings.loader";
import AssetSettingsPage from "modules/asset-settings/asset-settings.page";
import { AssetDescriptionType } from "modules/asset-settings/asset-settings.types";
import { programEditSignal } from "modules/program-signal/program-edit-signal/services/program-edit-signal.service";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import { dispatchFundDescription } from "shared/components/funds/fund-details/services/fund-details.service";
import { programDescriptionSelector } from "shared/components/programs/program-details/reducers/description.reducer";
import { ASSET } from "shared/constants/constants";
import { RootState } from "shared/reducers/root-reducer";
import { SetSubmittingType } from "shared/utils/types";

import FundSettings from "./fund-settings";
import { redirectToFund } from "./services/fund-settings.service";

const _FundSettingsPage: React.FC<Props> = ({
  service: {
    programEditSignal,
    changeBrokerMethod,
    cancelChangeBrokerMethod,
    dispatchDescription
  },
  t,
  description
}) => {
  const effect = () => {};
  return (
    <AssetSettingsPage
      redirectToAsset={redirectToFund}
      asset={ASSET.PROGRAM}
      description={description as AssetDescriptionType}
      effect={effect}
      dispatchDescription={dispatchFundDescription}
      settingsBlocks={(editProgram, applyCloseAsset) => (
        <FundSettings
          condition={!!description}
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
  description: programDescriptionSelector(state)
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
  description?: ProgramDetailsFull;
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
