import "shared/components/details/details.scss";

import { BrokersProgramInfo, ProgramDetailsFull } from "gv-api-web";
import AssetSettingsLoader from "modules/asset-settings/asset-settings.loader";
import AssetSettingsPage from "modules/asset-settings/asset-settings.page";
import { AssetDescriptionType } from "modules/asset-settings/asset-settings.types";
import { programEditSignal } from "modules/program-signal/program-edit-signal/services/program-edit-signal.service";
import { NextPageContext } from "next";
import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import { programDescriptionSelector } from "shared/components/programs/program-details/reducers/description.reducer";
import {
  dispatchProgramDescription,
  getProgramBrokers
} from "shared/components/programs/program-details/services/program-details.service";
import { ASSET } from "shared/constants/constants";
import { RootState } from "shared/reducers/root-reducer";
import { SetSubmittingType } from "shared/utils/types";

import { ChangeBrokerFormValues } from "./change-broker/change-broker-form";
import ProgramSettings from "./program-settings";
import {
  cancelChangeBrokerMethod,
  changeBrokerMethod,
  redirectToProgram
} from "./services/program-settings.service";
import { IProgramSignalFormValues } from "./signaling-edit";

const _ProgramsEditPage: React.FC<Props> = ({
  ctx,
  service: {
    programEditSignal,
    changeBrokerMethod,
    cancelChangeBrokerMethod,
    dispatchDescription
  },
  t,
  description
}) => {
  const [brokersInfo, setBrokersInfo] = useState<
    BrokersProgramInfo | undefined
  >(undefined);
  useEffect(
    () => {
      description && getProgramBrokers(description.id).then(setBrokersInfo);
    },
    [description]
  );
  const changeSignaling = useCallback(
    ({ volumeFee, successFee }: IProgramSignalFormValues) =>
      programEditSignal(description!.id, successFee!, volumeFee!).then(
        dispatchDescription
      ),
    [programEditSignal, description, dispatchDescription]
  );
  const changeBroker = useCallback(
    (
      { brokerAccountTypeId, leverage }: ChangeBrokerFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      changeBrokerMethod(
        description!.id,
        brokerAccountTypeId,
        leverage,
        setSubmitting
      ).then(dispatchDescription);
    },
    [changeBrokerMethod, description, dispatchDescription]
  );
  const cancelChangeBroker = useCallback(
    () => {
      cancelChangeBrokerMethod(description!.id).then(dispatchDescription);
    },
    [cancelChangeBrokerMethod, description, dispatchDescription]
  );
  return (
    <AssetSettingsPage
      redirectToAsset={redirectToProgram}
      asset={ASSET.PROGRAM}
      description={description as AssetDescriptionType}
      dispatchDescription={dispatchProgramDescription}
      settingsBlocks={(editProgram, applyCloseAsset) => (
        <ProgramSettings
          condition={!!description && !!brokersInfo}
          closePeriod={dispatchProgramDescription}
          closeProgram={applyCloseAsset}
          details={description!}
          editProgram={editProgram}
          brokersInfo={brokersInfo!}
          changeBroker={changeBroker}
          loader={<AssetSettingsLoader />}
          changeSignaling={changeSignaling}
          cancelChangeBroker={cancelChangeBroker}
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
      cancelChangeBrokerMethod,
      dispatchDescription: dispatchProgramDescription,
      programEditSignal,
      changeBrokerMethod
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

interface OwnProps {
  ctx?: NextPageContext;
}

interface StateProps {
  description?: ProgramDetailsFull;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  cancelChangeBrokerMethod: typeof cancelChangeBrokerMethod;
  dispatchDescription: typeof dispatchProgramDescription;
  programEditSignal: typeof programEditSignal;
  changeBrokerMethod: typeof changeBrokerMethod;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, DispatchProps, WithTranslation, StateProps {}

const ProgramSettingsPage = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_ProgramsEditPage);
export default ProgramSettingsPage;
