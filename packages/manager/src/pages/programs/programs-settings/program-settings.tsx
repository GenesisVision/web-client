import "./program-settings.scss";

import { BrokersProgramInfo, ProgramDetailsFull } from "gv-api-web";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import { SetSubmittingType } from "shared/utils/types";

import BrokerEdit from "./broker-edit";
import ProgramEdit, { ProgramEditFormValues } from "./program-edit";
import SignalingEdit, { IProgramSignalFormValues } from "./signaling-edit";

const _ProgramSettings: React.FC<Props> = ({
  t,
  brokersInfo,
  details,
  changeBroker,
  editProgram,
  changePassword,
  closePeriod,
  closeProgram,
  changeSignaling
}) => {
  const signalSuccessFee = details.isSignalProgram
    ? details.signalSuccessFee
    : undefined;
  const signalVolumeFee = details.isSignalProgram
    ? details.signalVolumeFee
    : undefined;
  return (
    <div className="program-edit">
      <h1>Program settings</h1>
      <section className="program-edit__block">
        <h3>Period and closing</h3>
        <div className="program-edit__block-wrapper">
          <p className="program-edit__text">
            The investment program will be closed after this reporting period.
            Current investment requests will be cancelled, and new requests
            won’t be accepted. Profit and funds from the trading account will be
            distributed between investors and manager according to their shares
            within the aforementioned program.
          </p>
          <GVButton
            disabled={!details.personalProgramDetails.canClosePeriod}
            onClick={closePeriod}
          >
            {"Close period"}
          </GVButton>
        </div>
        <div className="program-edit__block-wrapper">
          <p className="program-edit__text">
            The current period of the program will end in one hour.
          </p>
          <GVButton
            disabled={!details.personalProgramDetails.canCloseProgram}
            onClick={closeProgram}
          >
            {"Close program"}
          </GVButton>
        </div>
      </section>
      {details.personalProgramDetails.canChangePassword &&
        details.personalProgramDetails.canCloseProgram && (
          <section className="program-edit__block">
            <h3>Password</h3>
            <p className="program-edit__text">
              Change the password of your trading account.
            </p>
            <GVButton onClick={changePassword}>{"Change password"}</GVButton>
          </section>
        )}
      {details.personalProgramDetails.canCloseProgram && (
        <>
          <section className="program-edit__block">
            <ProgramEdit
              logo={{ src: details.logo }}
              description={details.description}
              onSubmit={editProgram}
            />
          </section>
          <section className="program-edit__block">
            <BrokerEdit
              id={details.id}
              brokers={brokersInfo.brokers}
              selectedBroker={
                brokersInfo.brokers.find(
                  broker =>
                    !!broker.accountTypes.find(
                      accountType =>
                        accountType.id === brokersInfo.currentAccountTypeId
                    )
                )!
              }
              changeBroker={changeBroker}
            />
          </section>
          <section className="program-edit__block">
            <SignalingEdit
              isSignalProgram={details.isSignalProgram}
              onSubmit={changeSignaling}
              signalSuccessFee={signalSuccessFee}
              signalVolumeFee={signalVolumeFee}
            />
          </section>
        </>
      )}
    </div>
  );
};

interface Props extends OwnProps, InjectedTranslateProps {}

interface OwnProps {
  details: ProgramDetailsFull;
  brokersInfo: BrokersProgramInfo;
  changeSignaling: (
    values: IProgramSignalFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  closePeriod: () => void;
  closeProgram: () => void;
  changePassword: () => void;
  changeBroker: (
    programId: string,
    newBrokerAccountTypeId: string,
    newLeverage: number
  ) => () => void;
  editProgram: (
    values: ProgramEditFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}

const ProgramSettings = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_ProgramSettings);
export default ProgramSettings;
