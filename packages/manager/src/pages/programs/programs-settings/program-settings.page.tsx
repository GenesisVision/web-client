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
import useIsOpen from "shared/hooks/is-open.hook";
import { SetSubmittingType } from "shared/utils/types";

import ClosePeriodContainer from "../program-details/components/close-period/close-period-container";
import CloseProgramContainer from "../program-details/components/close-program/close-program-container";
import { ChangeBrokerFormValues } from "./broker-edit";
import ProgramSettings from "./program-settings";
import ProgramSettingsLoader from "./program-settings.loader";
import {
  changeBrokerMethod,
  redirectToProgram
} from "./services/program-settings.service";
import { IProgramSignalFormValues } from "./signaling-edit";

const _ProgramsEditPage: React.FC<Props> = ({ service, t }) => {
  const [
    isClosePeriodOpen,
    setClosePeriodOpen,
    setClosePeriodClose
  ] = useIsOpen();
  const [
    isCloseProgramOpen,
    setCloseProgramOpen,
    setCloseProgramClose
  ] = useIsOpen();
  const [
    isChangePasswordOpen,
    setChangePasswordOpen,
    setChangePasswordClose
  ] = useIsOpen();
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
  const applyClose = useCallback(
    () => fetchingDescription().then(service.redirectToProgram),
    []
  );

  return (
    <Page title={t("manager.program-settings.title")}>
      <ProgramSettings
        condition={!!details && !!brokersInfo}
        loader={<ProgramSettingsLoader />}
        changeSignaling={changeSignaling}
        closePeriod={setClosePeriodOpen}
        closeProgram={setCloseProgramOpen}
        details={details!}
        changePassword={setChangePasswordOpen}
        brokersInfo={brokersInfo!}
        changeBroker={changeBroker}
        editProgram={editProgram}
      />
      {details && (
        <>
          <ClosePeriodContainer
          open={isClosePeriodOpen}
          onClose={setClosePeriodClose}
          onApply={fetchingDescription}
          id={details.id}
        />
        <CloseProgramContainer
        open={isCloseProgramOpen}
        onClose={setCloseProgramClose}
        onApply={applyClose}
        id={details.id}
        />
        <ChangePasswordTradingAccountPopup
        programName={details.title}
        open={isChangePasswordOpen}
        id={details.id}
        onClose={setChangePasswordClose}
        />
        </>
      )}
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
