import "shared/components/details/details.scss";

import { BrokersProgramInfo, ProgramDetailsFull } from "gv-api-web";
import { editAsset } from "modules/asset-edit/services/asset-edit.services";
import { programEditSignal } from "modules/program-signal/program-edit-signal/services/program-edit-signal.service";
import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import Page from "shared/components/page/page";
import { programDescriptionSelector } from "shared/components/programs/program-details/reducers/description.reducer";
import {
  dispatchProgramDescription,
  getProgramBrokers
} from "shared/components/programs/program-details/services/program-details.service";
import { ASSET } from "shared/constants/constants";
import { RootState } from "shared/reducers/root-reducer";
import { SetSubmittingType } from "shared/utils/types";

import { ChangeBrokerFormValues } from "./change-broker/change-broker";
import ProgramSettings from "./program-settings";
import ProgramSettingsLoader from "./program-settings.loader";
import {
  cancelChangeBrokerMethod,
  changeBrokerMethod,
  redirectToProgram
} from "./services/program-settings.service";
import { IProgramSignalFormValues } from "./signaling-edit";

const _ProgramsEditPage: React.FC<Props> = ({ service, t, description }) => {
  const [brokersInfo, setBrokersInfo] = useState<
    BrokersProgramInfo | undefined
  >(undefined);
  const fetchingDescription = () => {
    service.dispatchProgramDescription();
    description && getProgramBrokers(description.id).then(setBrokersInfo);
  };
  useEffect(() => {
    fetchingDescription();
  }, []);
  const changeSignaling = useCallback(
    ({ volumeFee, successFee }: IProgramSignalFormValues) =>
      service
        .programEditSignal(description!.id, successFee!, volumeFee!)
        .then(fetchingDescription),
    [description]
  );
  const changeBroker = useCallback(
    (
      { brokerAccountTypeId, leverage }: ChangeBrokerFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      service
        .changeBrokerMethod(
          description!.id,
          brokerAccountTypeId,
          leverage,
          setSubmitting
        )
        .then(fetchingDescription);
    },
    [description]
  );
  const cancelChangeBroker = useCallback(
    () => {
      service
        .cancelChangeBrokerMethod(description!.id)
        .then(fetchingDescription);
    },
    [description]
  );
  const editProgram: TUpdateProgramFunc = useCallback(
    values => {
      const currentValues = {
        title: description!.title,
        stopOutLevel: description!.stopOutLevel,
        description: description!.description,
        logo: { src: description!.logo },
        investmentLimit: description!.availableInvestmentLimit
      };
      service
        .editAsset(
          description!.id,
          { ...currentValues, ...values },
          ASSET.PROGRAM
        )
        .then(fetchingDescription);
    },
    [description]
  );
  const applyCloseProgram = useCallback(() => service.redirectToProgram(), []);

  return (
    <Page title={t("manager.program-settings.title")}>
      <ProgramSettings
        condition={!!description && !!brokersInfo}
        loader={<ProgramSettingsLoader />}
        changeSignaling={changeSignaling}
        closePeriod={fetchingDescription}
        closeProgram={applyCloseProgram}
        details={description!}
        brokersInfo={brokersInfo!}
        changeBroker={changeBroker}
        editProgram={editProgram}
        cancelChangeBroker={cancelChangeBroker}
      />
    </Page>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  description: programDescriptionSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      cancelChangeBrokerMethod,
      dispatchProgramDescription,
      editAsset,
      programEditSignal,
      changeBrokerMethod,
      redirectToProgram
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
  cancelChangeBrokerMethod: typeof cancelChangeBrokerMethod;
  dispatchProgramDescription: typeof dispatchProgramDescription;
  editAsset: typeof editAsset;
  programEditSignal: typeof programEditSignal;
  changeBrokerMethod: typeof changeBrokerMethod;
  redirectToProgram: typeof redirectToProgram;
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
