import "shared/components/details/details.scss";

import { BrokersProgramInfo, ProgramDetailsFull } from "gv-api-web";
import { editAsset } from "modules/asset-edit/services/asset-edit.services";
import ChangePasswordTradingAccountPopup from "modules/change-password-trading-account/change-password-trading-account-popup";
import { programEditSignal } from "modules/program-signal/program-edit-signal/services/program-edit-signal.service";
import React, { useCallback, useEffect, useState } from "react";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import Page from "shared/components/page/page";
import {
  getProgramBrokers,
  getProgramDescription
} from "shared/components/programs/program-details/services/program-details.service";
import { ASSET } from "shared/constants/constants";
import { SetSubmittingType } from "shared/utils/types";

import ClosePeriodContainer from "../program-details/components/close-period/close-period-container";
import CloseProgramContainer from "../program-details/components/close-program/close-program-container";
import { ProgramEditFormValues } from "./program-edit";
import ProgramSettings from "./program-settings";
import {
  changeBrokerMethod,
  redirectToProgram
} from "./services/program-settings.service";
import { IProgramSignalFormValues } from "./signaling-edit";

const _ProgramsEditPage: React.FC<Props> = ({ service }) => {
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

  const getDescription = useEffect(() => {
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
      programId: string,
      newBrokerAccountTypeId: string,
      newLeverage: number
    ) => () => {
      service.changeBrokerMethod(
        programId,
        newBrokerAccountTypeId,
        newLeverage
      );
    },
    []
  );
  const changePassword = useCallback(() => setChangePasswordOpen(true), []);
  const editProgram = useCallback(
    (
      { description, logo }: ProgramEditFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      if (!details) return;
      const {
        id,
        title,
        stopOutLevel,
        availableInvestmentLimit: investmentLimit
      } = details;
      service
        .editAsset(
          id,
          { title, stopOutLevel, investmentLimit, description, logo },
          ASSET.PROGRAM
        )
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
    <Page title={"Edit"}>
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

interface Props extends OwnProps, DispatchProps {}

const ProgramSettingsPage = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_ProgramsEditPage);
export default ProgramSettingsPage;
