import "shared/components/details/details.scss";

import { BrokersProgramInfo, ProgramDetailsFull } from "gv-api-web";
import { editAsset } from "modules/asset-edit/services/asset-edit.services";
import { programEditSignal } from "modules/program-signal/program-edit-signal/services/program-edit-signal.service";
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
import Page from "shared/components/page/page";
import {
  getProgramBrokers,
  getProgramDescription
} from "shared/components/programs/program-details/services/program-details.service";
import { ASSET } from "shared/constants/constants";
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

const _ProgramsEditPage: React.FC<Props> = ({ service, t }) => {
  const [details, setDetails] = useState<ProgramDetailsFull | undefined>(
    undefined
  );
  const [brokersInfo, setBrokersInfo] = useState<
    BrokersProgramInfo | undefined
  >(undefined);
  const fetchingDescription = () =>
    service
      .getProgramDescription()
      .then(description => {
        setDetails(description);
        return getProgramBrokers(description.id);
      })
      .then(setBrokersInfo);
  useEffect(() => {
    fetchingDescription();
  }, []);
  const changeSignaling = useCallback(
    ({ volumeFee, successFee }: IProgramSignalFormValues) =>
      service
        .programEditSignal(details!.id, successFee!, volumeFee!)
        .then(fetchingDescription),
    [details]
  );
  const changeBroker = useCallback(
    (
      { brokerAccountTypeId, leverage }: ChangeBrokerFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      service
        .changeBrokerMethod(
          details!.id,
          brokerAccountTypeId,
          leverage,
          setSubmitting
        )
        .then(fetchingDescription);
    },
    [details]
  );
  const cancelChangeBroker = useCallback(
    () => {
      service.cancelChangeBrokerMethod(details!.id).then(fetchingDescription);
    },
    [details]
  );
  const editProgram: TUpdateProgramFunc = useCallback(
    values => {
      const currentValues = {
        title: details!.title,
        stopOutLevel: details!.stopOutLevel,
        description: details!.description,
        logo: { src: details!.logo },
        investmentLimit: details!.availableInvestmentLimit
      };
      service
        .editAsset(details!.id, { ...currentValues, ...values }, ASSET.PROGRAM)
        .then(fetchingDescription);
    },
    [details]
  );
  const applyCloseProgram = useCallback(
    () => fetchingDescription().then(service.redirectToProgram),
    []
  );

  return (
    <Page title={t("manager.program-settings.title")}>
      <ProgramSettings
        condition={!!details && !!brokersInfo}
        loader={<ProgramSettingsLoader />}
        changeSignaling={changeSignaling}
        closePeriod={fetchingDescription}
        closeProgram={applyCloseProgram}
        details={details!}
        brokersInfo={brokersInfo!}
        changeBroker={changeBroker}
        editProgram={editProgram}
        cancelChangeBroker={cancelChangeBroker}
      />
    </Page>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      cancelChangeBrokerMethod,
      getProgramDescription,
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

interface ServiceThunks extends ActionCreatorsMapObject {
  cancelChangeBrokerMethod: typeof cancelChangeBrokerMethod;
  getProgramDescription: typeof getProgramDescription;
  editAsset: typeof editAsset;
  programEditSignal: typeof programEditSignal;
  changeBrokerMethod: typeof changeBrokerMethod;
  redirectToProgram: typeof redirectToProgram;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, DispatchProps, WithTranslation {}

const ProgramSettingsPage = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_ProgramsEditPage);
export default ProgramSettingsPage;
