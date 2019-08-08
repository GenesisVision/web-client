import "./asset-settings.scss";

import { BrokersProgramInfo, ProgramDetailsFull } from "gv-api-web";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { SetSubmittingType } from "shared/utils/types";

import AssetEdit from "./asset-edit";
import { TUpdateAssetFunc } from "./asset-settings.page";
import CancelChangeBroker from "./cancel-change-broker/cancel-change-broker";
import ChangeBroker from "./change-broker/change-broker";
import { ChangeBrokerFormValues } from "./change-broker/change-broker-form";
import ChangePassword from "./change-password/change-password";
import InvestmentLimit from "./investment-limit";
import PeriodAndClosing from "./period-and-closing";
import SignalingEdit, { IAssetSignalFormValues } from "./signaling-edit";
import StopOutLevel from "./stop-out-level";
import TwoFactorConfirm from "./two-factor-confirm";

const _AssetSettings: React.FC<Props> = ({
  cancelChangeBroker,
  t,
  brokersInfo,
  details,
  changeBroker,
  editAsset,
  closePeriod,
  closeAsset,
  changeSignaling
}) => {
  const signalSuccessFee = details.isSignalProgram
    ? details.signalSuccessFee
    : undefined;
  const signalVolumeFee = details.isSignalProgram
    ? details.signalVolumeFee
    : undefined;
  return (
    <div className="asset-settings">
      <h1>{t("manager.asset-settings.title")}</h1>
      <TwoFactorConfirm
        condition={details.personalProgramDetails.showTwoFactorButton}
        id={details.id}
      />
      <PeriodAndClosing
        canClosePeriod={details.personalProgramDetails.canClosePeriod}
        canCloseAsset={details.personalProgramDetails.canCloseAsset}
        id={details.id}
        closePeriod={closePeriod}
        closeAsset={closeAsset}
      />
      <ChangePassword
        condition={
          details.personalProgramDetails.canChangePassword &&
          details.personalProgramDetails.canCloseAsset
        }
        title={details.title}
        id={details.id}
      />
      <AssetEdit
        title={details.title}
        logo={{ src: details.logo }}
        description={details.description}
        onSubmit={editAsset}
      />
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
      <StopOutLevel stopOutLevel={details.stopOutLevel} onSubmit={editAsset} />
      <InvestmentLimit
        currency={details.currency}
        investmentLimit={details.availableInvestmentLimit}
        onSubmit={editAsset}
      />
      <SignalingEdit
        condition={
          details.isSignalProgram ||
          (!details.isSignalProgram &&
            details.personalProgramDetails.canMakeSignalProvider)
        }
        isSignalAsset={details.isSignalProgram}
        onSubmit={changeSignaling}
        signalSuccessFee={signalSuccessFee}
        signalVolumeFee={signalVolumeFee}
      />
    </div>
  );
};

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  details: ProgramDetailsFull;
  brokersInfo: BrokersProgramInfo;
  changeSignaling: (
    values: IAssetSignalFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  closePeriod: () => void;
  closeAsset: () => void;
  changeBroker: (
    values: ChangeBrokerFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  editAsset: TUpdateAssetFunc;
  cancelChangeBroker: () => void;
}

const AssetSettings = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  translate(),
  React.memo
)(_AssetSettings);
export default AssetSettings;
