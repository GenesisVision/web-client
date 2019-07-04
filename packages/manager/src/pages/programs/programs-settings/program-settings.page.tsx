import "shared/components/details/details.scss";

import { BrokersProgramInfo, ProgramDetailsFull } from "gv-api-web";
import { editAsset } from "modules/asset-edit/services/asset-edit.services";
import ChangePasswordTradingAccountPopup from "modules/change-password-trading-account/change-password-trading-account-popup";
import { programEditSignal } from "modules/program-signal/program-edit-signal/services/program-edit-signal.service";
import React, { useCallback, useEffect, useState } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import Page from "shared/components/page/page";
import {
  getProgramBrokers,
  getProgramDescription
} from "shared/components/programs/program-details/services/program-details.service";
import { ASSET } from "shared/constants/constants";
import { SetSubmittingType } from "shared/utils/types";

import ClosePeriodContainer from "../program-details/components/close-period/close-period-container";
import CloseProgramContainer from "../program-details/components/close-program/close-program-container";
import { ChangeBrokerFormValues } from "./broker-edit";
import ProgramSettings from "./program-settings";
import {
  changeBrokerMethod,
  redirectToProgram
} from "./services/program-settings.service";
import { IProgramSignalFormValues } from "./signaling-edit";

const _ProgramsEditPage: React.FC<Props> = ({ service, t }) => {
  const fetchingDescription = () =>
    service
      .getProgramDescription()
      .then(description => {
        setDetails(description);
        return getProgramBrokers(description.id);
      })
      .then(brokers => setBrokersInfo(brokers));

  const [closePeriodOpen, setClosePeriodOpen] = useState<boolean>(false);
  const [closeProgramOpen, setCloseProgramOpen] = useState<boolean>(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState<boolean>(false);
  const [details, setDetails] = useState<ProgramDetailsFull | undefined>(
    undefined
  );
  const [brokersInfo, setBrokersInfo] = useState<
    BrokersProgramInfo | undefined
  >(undefined);

  useEffect(() => {
    fetchingDescription();
  }, []);

  const changeSignaling = useCallback(
    (
      { volumeFee, successFee }: IProgramSignalFormValues,
      setSubmitting: SetSubmittingType
    ) =>
      service
        .programEditSignal(details!.id, successFee!, volumeFee!)
        .then(() => {
          setSubmitting(false);
          fetchingDescription();
        }),
    [details]
  );
  const closePeriod = useCallback(() => setClosePeriodOpen(true), []);
  const closeProgram = useCallback(() => setCloseProgramOpen(true), []);
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
        .then(() => fetchingDescription());
    },
    [details]
  );
  const changePassword = useCallback(() => setChangePasswordOpen(true), []);
  const editProgram: TUpdateProgramFunc = useCallback(
    (values, setSubmitting) => {
      const currentValues = {
        title: details!.title,
        stopOutLevel: details!.stopOutLevel,
        description: details!.description,
        logo: { src: details!.logo },
        investmentLimit: details!.availableInvestmentLimit
      };
      service
        .editAsset(details!.id, { ...currentValues, ...values }, ASSET.PROGRAM)
        .then(() => {
          setSubmitting(false);
          fetchingDescription();
        });
    },
    [details]
  );
  const applyChanges = useCallback(() => fetchingDescription(), []);
  const applyClose = useCallback(() => {
    applyChanges().then(() => service.redirectToProgram());
  }, []);

  if (!details || !brokersInfo) return null;
  return (
    <Page title={t("manager.program-settings.title")}>
      <ProgramSettings
        changeSignaling={changeSignaling}
        closePeriod={closePeriod}
        closeProgram={closeProgram}
        details={details}
        changePassword={changePassword}
        brokersInfo={brokersInfo}
        changeBroker={changeBroker}
        editProgram={editProgram}
      />
      <ClosePeriodContainer
        open={closePeriodOpen}
        onClose={() => setClosePeriodOpen(false)}
        onApply={applyChanges}
        id={details.id}
      />
      <CloseProgramContainer
        open={closeProgramOpen}
        onClose={() => setCloseProgramOpen(false)}
        onApply={applyClose}
        id={details.id}
      />
      <ChangePasswordTradingAccountPopup
        programName={details.title}
        open={changePasswordOpen}
        id={details.id}
        onClose={() => setChangePasswordOpen(false)}
      />
    </Page>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
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
  getProgramDescription: typeof getProgramDescription;
  editAsset: typeof editAsset;
  programEditSignal: typeof programEditSignal;
  changeBrokerMethod: typeof changeBrokerMethod;
  redirectToProgram: typeof redirectToProgram;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, DispatchProps, InjectedTranslateProps {}

const ProgramSettingsPage = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_ProgramsEditPage);
export default ProgramSettingsPage;
