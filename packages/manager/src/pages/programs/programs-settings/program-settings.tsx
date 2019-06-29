import "./program-settings.scss";

import { BrokersProgramInfo, ProgramDetailsFull } from "gv-api-web";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import { SetSubmittingType } from "shared/utils/types";

import BrokerEdit, { ChangeBrokerFormValues } from "./broker-edit";
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
      <h1>{t("manager.program-settings.title")}</h1>
      <section className="program-edit__block">
        <h3>{t("manager.program-settings.period-and-closing.title")}</h3>
        <div className="program-edit__block-wrapper">
          <p className="program-edit__text">
            {t("manager.program-settings.period-and-closing.text-program")}
          </p>
          <GVButton
            color="primary"
            disabled={!details.personalProgramDetails.canClosePeriod}
            onClick={closePeriod}
          >
            {t("program-details-page.close-period.title")}
          </GVButton>
        </div>
        <div className="program-edit__block-wrapper">
          <p className="program-edit__text">
            {t("manager.program-settings.period-and-closing.text-period")}
          </p>
          <GVButton
            color="primary"
            disabled={!details.personalProgramDetails.canCloseProgram}
            onClick={closeProgram}
          >
            {t("program-details-page.description.close-program")}
          </GVButton>
        </div>
      </section>
      {details.personalProgramDetails.canChangePassword &&
        details.personalProgramDetails.canCloseProgram && (
          <section className="program-edit__block">
            <h3>{t("manager.program-settings.password.title")}</h3>
            <p className="program-edit__text">
              {t("manager.program-settings.password.text")}
            </p>
            <GVButton color="primary" onClick={changePassword}>
              {t("program-details-page.description.change-password")}
            </GVButton>
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
          {brokersInfo.brokers.length > 1 && (
            <section className="program-edit__block">
              <BrokerEdit
                onSubmit={changeBroker}
                id={details.id}
                brokers={brokersInfo.brokers}
                currentAccountTypeId={brokersInfo.currentAccountTypeId}
                leverage={details.leverageMax}
              />
            </section>
          )}
          {details.personalProgramDetails.canMakeSignalProvider && (
            <section className="program-edit__block">
              <SignalingEdit
                isSignalProgram={details.isSignalProgram}
                onSubmit={changeSignaling}
                signalSuccessFee={signalSuccessFee}
                signalVolumeFee={signalVolumeFee}
              />
            </section>
          )}
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
    values: ChangeBrokerFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
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
