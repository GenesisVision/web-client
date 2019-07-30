import "./program-settings.scss";

import { BrokersProgramInfo, ProgramDetailsFull } from "gv-api-web";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { SetSubmittingType } from "shared/utils/types";

import CancelChangeBroker from "./cancel-change-broker/cancel-change-broker";
import ChangeBroker, {
  ChangeBrokerFormValues
} from "./change-broker/change-broker";
import ChangePassword from "./change-password/change-password";
import CloseProgramPeriod from "./close-period/close-program-period";
import CloseProgram from "./close-program/close-program";
import InvestmentLimit from "./investment-limit";
import ProgramEdit from "./program-edit";
import { TUpdateProgramFunc } from "./program-settings.page";
import SignalingEdit, { IProgramSignalFormValues } from "./signaling-edit";
import StopOutLevel from "./stop-out-level";
import TwoFactorConfirm from "./two-factor-confirm";

const _ProgramSettings: React.FC<Props> = ({
  cancelChangeBroker,
  t,
  brokersInfo,
  details,
  changeBroker,
  editProgram,
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
    <div className="program-settings">
      <h1>{t("manager.program-settings.title")}</h1>
      <TwoFactorConfirm
        condition={details.personalProgramDetails.showTwoFactorButton}
        id={details.id}
      />
      <section className="program-settings__block">
        <h3>{t("manager.program-settings.period-and-closing.title")}</h3>
        <CloseProgramPeriod
          canClose={details.personalProgramDetails.canClosePeriod}
          onApply={closePeriod}
          id={details.id}
        />
        <CloseProgram
          canClose={details.personalProgramDetails.canCloseProgram}
          onApply={closeProgram}
          id={details.id}
        />
      </section>
      <ChangePassword
        condition={
          details.personalProgramDetails.canChangePassword &&
          details.personalProgramDetails.canCloseProgram
        }
        title={details.title}
        id={details.id}
      />
      {details.personalProgramDetails.canCloseProgram && (
        <>
          <section className="program-settings__block">
            <ProgramEdit
              title={details.title}
              logo={{ src: details.logo }}
              description={details.description}
              onSubmit={editProgram}
            />
          </section>
          {details.personalProgramDetails.migration && (
            <section className="program-settings__block">
              <CancelChangeBroker
                brokerFrom={
                  brokersInfo.brokers.find(
                    broker =>
                      !!broker.accountTypes.find(
                        accountType =>
                          accountType.id === brokersInfo.currentAccountTypeId
                      )
                  )!
                }
                brokerTo={details.personalProgramDetails.migration.newBroker}
                onSubmit={cancelChangeBroker}
                currentAccountTypeId={brokersInfo.currentAccountTypeId}
                leverage={details.leverageMax}
                newLeverage={
                  details.personalProgramDetails.migration.newLeverage
                }
              />
            </section>
          )}
          {!!!details.personalProgramDetails.migration &&
            brokersInfo.brokers.length > 1 && (
              <section className="program-settings__block">
                <ChangeBroker
                  onSubmit={changeBroker}
                  id={details.id}
                  brokers={brokersInfo.brokers}
                  currentAccountTypeId={brokersInfo.currentAccountTypeId}
                  currentLeverage={details.leverageMax}
                />
              </section>
            )}
          <section className="program-settings__block">
            <StopOutLevel
              stopOutLevel={details.stopOutLevel}
              onSubmit={editProgram}
            />
          </section>
          <InvestmentLimit
            currency={details.currency}
            investmentLimit={details.availableInvestmentLimit}
            onSubmit={editProgram}
          />
          <SignalingEdit
            condition={
              details.isSignalProgram ||
              (!details.isSignalProgram &&
                details.personalProgramDetails.canMakeSignalProvider)
            }
            isSignalProgram={details.isSignalProgram}
            onSubmit={changeSignaling}
            signalSuccessFee={signalSuccessFee}
            signalVolumeFee={signalVolumeFee}
          />
        </>
      )}
    </div>
  );
};

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  details: ProgramDetailsFull;
  brokersInfo: BrokersProgramInfo;
  changeSignaling: (
    values: IProgramSignalFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  closePeriod: () => void;
  closeProgram: () => void;
  changeBroker: (
    values: ChangeBrokerFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  editProgram: TUpdateProgramFunc;
  cancelChangeBroker: () => void;
}

const ProgramSettings = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  React.memo
)(_ProgramSettings);
export default ProgramSettings;
