import "./program-settings.scss";

import { BrokersProgramInfo, ProgramDetailsFull } from "gv-api-web";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { SetSubmittingType } from "shared/utils/types";

import CancelChangeBroker from "./cancel-change-broker/cancel-change-broker";
import ChangeBroker from "./change-broker/change-broker";
import { ChangeBrokerFormValues } from "./change-broker/change-broker-form";
import ChangePassword from "./change-password/change-password";
import InvestmentLimit from "./investment-limit";
import PeriodAndClosing from "./period-and-closing";
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
      <PeriodAndClosing
        canClosePeriod={details.personalProgramDetails.canClosePeriod}
        canCloseProgram={details.personalProgramDetails.canCloseProgram}
        id={details.id}
        closePeriod={closePeriod}
        closeProgram={closeProgram}
      />
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
          <CancelChangeBroker
            condition={!!details.personalProgramDetails.migration}
            brokerFrom={
              brokersInfo.brokers.find(
                broker =>
                  !!broker.accountTypes.find(
                    accountType =>
                      accountType.id === brokersInfo.currentAccountTypeId
                  )
              )!
            }
            migration={details.personalProgramDetails.migration}
            onSubmit={cancelChangeBroker}
            currentAccountTypeId={brokersInfo.currentAccountTypeId}
            leverage={details.leverageMax}
          />
          <ChangeBroker
            condition={
              !!!details.personalProgramDetails.migration &&
              brokersInfo.brokers.length > 1
            }
            onSubmit={changeBroker}
            id={details.id}
            brokers={brokersInfo.brokers}
            currentAccountTypeId={brokersInfo.currentAccountTypeId}
            currentLeverage={details.leverageMax}
          />
          <StopOutLevel
            stopOutLevel={details.stopOutLevel}
            onSubmit={editProgram}
          />
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
