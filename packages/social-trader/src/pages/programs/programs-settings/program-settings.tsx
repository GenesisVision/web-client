import "./program-settings.scss";

import { BrokersProgramInfo, ProgramDetailsFull } from "gv-api-web";
import AssetEdit from "modules/asset-settings/asset-edit";
import CloseAssetBlock from "modules/asset-settings/close-asset/close-asset-block";
import ClosePeriodBlock from "modules/asset-settings/close-period/close-period-block";
// import InvestmentFees from "modules/asset-settings/investment-fees";
import React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import { ASSET } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { SetSubmittingType } from "shared/utils/types";

import CancelChangeBroker from "./cancel-change-broker/cancel-change-broker";
import ChangeBroker from "./change-broker/change-broker";
import { ChangeBrokerFormValues } from "./change-broker/change-broker-form";
import ChangePassword from "./change-password/change-password";
import InvestmentLimit from "./investment-limit";
import { TUpdateProgramFunc } from "./program-settings.page";
import { IProgramSignalFormValues } from "./signaling-edit";
import StopOutLevel from "./stop-out-level";
import TradesUpdating from "./trades-updating";
import TwoFactorConfirm from "./two-factor-confirm";

const _ProgramSettings: React.FC<Props> = ({
  // programsInfo,
  cancelChangeBroker,
  brokersInfo,
  details,
  changeBroker,
  editProgram,
  closePeriod,
  closeProgram,
  changeSignaling
}) => {
  const [t] = useTranslation();
  return (
    <>
      <TwoFactorConfirm
        condition={details.personalDetails.showTwoFactorButton}
        id={details.id}
      />
      <ClosePeriodBlock
        condition={!!details.personalDetails.ownerActions.canClosePeriod}
        id={details.id}
        closePeriod={closePeriod}
      />
      <ChangePassword
        condition={
          details.personalDetails.ownerActions.canChangePassword &&
          details.personalDetails.ownerActions.canClose
        }
        title={details.title}
        id={details.id}
      />
      <CancelChangeBroker
        condition={!!details.personalDetails.migration}
        isSignalProgram={!!details.signalSettings}
        brokerFrom={
          brokersInfo.brokers.find(
            broker =>
              !!broker.accountTypes.find(
                accountType =>
                  accountType.id === brokersInfo.currentAccountTypeId
              )
          )!
        }
        migration={details.personalDetails.migration}
        onSubmit={cancelChangeBroker}
        currentAccountTypeId={brokersInfo.currentAccountTypeId}
        leverage={details.leverageMax}
      />
      <ChangeBroker
        condition={
          !!!details.personalDetails.migration && brokersInfo.brokers.length > 1
        }
        isSignalProgram={!!details.signalSettings}
        onSubmit={changeBroker}
        id={details.id}
        brokers={brokersInfo.brokers}
        currentAccountTypeId={brokersInfo.currentAccountTypeId}
        currentLeverage={details.leverageMax}
      />
      {/*<InvestmentFees*/}
      {/*  asset={ASSET.PROGRAM}*/}
      {/*  programsInfo={programsInfo}*/}
      {/*  entryFee={details.entryFeeSelected}*/}
      {/*  successFee={details.successFeeCurrent}*/}
      {/*  onSubmit={editProgram}*/}
      {/*/>*/}
      <TradesUpdating
        condition={!details.signalSettings}
        tradesDelay={details.tradesDelay}
        onSubmit={editProgram}
      />
      <StopOutLevel
        stopOutLevel={details.stopOutLevelCurrent}
        onSubmit={editProgram}
      />
      <InvestmentLimit
        currency={details.currency}
        investmentLimit={details.availableInvestmentLimit}
        onSubmit={editProgram}
      />
      <AssetEdit
        title={details.title}
        logo={{ src: details.logo }}
        description={details.description}
        onSubmit={editProgram}
      />
      <CloseAssetBlock
        label={t("asset-settings.close-program.title")}
        asset={ASSET.PROGRAM}
        canCloseAsset={details.personalDetails.ownerActions.canClose}
        id={details.id}
        closeAsset={closeProgram}
      />
    </>
  );
};

interface Props {
  // programsInfo: ProgramsInfo;
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

const ProgramSettings = compose<React.ComponentType<Props & WithLoaderProps>>(
  withLoader,
  React.memo
)(_ProgramSettings);
export default ProgramSettings;
