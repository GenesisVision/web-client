import "./program-settings.scss";

import { ASSET } from "constants/constants";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import {
  ProgramCreateAssetPlatformInfo,
  ProgramFollowDetailsFull
} from "gv-api-web";
import AssetEdit from "modules/asset-settings/asset-edit";
import CloseAssetBlock from "modules/asset-settings/close-asset/close-asset-block";
import ClosePeriodBlock from "modules/asset-settings/close-period/close-period-block";
import InvestmentFees from "modules/asset-settings/investment-fees";
import React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";

import CancelChangeBroker from "./cancel-change-broker/cancel-change-broker";
import ChangeBroker from "./change-broker/change-broker";
import ChangePassword from "./change-password/change-password";
import InvestmentLimit from "./investment-limit";
import { TUpdateProgramFunc } from "./program-settings.page";
import SignalingEdit from "./signaling-edit";
import StopOutLevel from "./stop-out-level";
import TradesUpdating from "./trades-updating";
import TwoFactorConfirm from "./two-factor-confirm";

const _ProgramSettings: React.FC<Props> = ({
  editError,
  updateDescription,
  createProgramInfo: { maxSuccessFee, maxEntryFee },
  description,
  editProgram,
  closeProgram
}) => {
  const [t] = useTranslation();
  const { programDetails, followDetails, tradingAccountInfo } = description;
  const signalSuccessFee =
    followDetails && followDetails.signalSettings
      ? followDetails.signalSettings.signalSuccessFee
      : undefined;
  const signalVolumeFee =
    followDetails && followDetails.signalSettings
      ? followDetails.signalSettings.signalVolumeFee
      : undefined;
  const isSignalProgram = !!description.followDetails;
  const assetType = description.publicInfo.typeExt;
  const closeId =
    assetType === "Program" || assetType === "SignalProgram"
      ? description.id
      : description.tradingAccountInfo.id;
  return (
    <>
      <ChangePassword
        condition={
          description.ownerActions.canChangePassword &&
          description.ownerActions.canClose
        }
        title={description.publicInfo.title}
        id={tradingAccountInfo.id}
      />
      {programDetails && (
        <>
          <TwoFactorConfirm
            condition={programDetails.personalDetails.showTwoFactorButton}
            id={description.id}
          />
          <ClosePeriodBlock
            condition={description.ownerActions.canClosePeriod}
            id={description.id}
            closePeriod={updateDescription}
          />
          <CancelChangeBroker
            onApply={updateDescription}
            id={description.id}
            condition={!!programDetails.personalDetails.migration}
            isSignalProgram={isSignalProgram}
            migration={programDetails.personalDetails.migration}
            leverage={description.tradingAccountInfo.leverageMax}
          />
          <ChangeBroker
            onApply={updateDescription}
            condition={!programDetails.personalDetails.migration}
            isSignalProgram={isSignalProgram}
            id={description.id}
            currentLeverage={description.tradingAccountInfo.leverageMax}
          />
          <InvestmentFees
            editError={editError}
            asset={ASSET.PROGRAM}
            maxSuccessFee={maxSuccessFee}
            maxEntryFee={maxEntryFee}
            entryFee={programDetails.entryFeeSelected}
            successFee={programDetails.successFeeSelected}
            onSubmit={editProgram}
          />
          <TradesUpdating
            editError={editError}
            condition={!isSignalProgram}
            tradesDelay={programDetails.tradesDelay}
            onSubmit={editProgram}
          />
          <StopOutLevel
            editError={editError}
            stopOutLevel={programDetails.stopOutLevelCurrent}
            onSubmit={editProgram}
          />
          <InvestmentLimit
            editError={editError}
            currency={description.tradingAccountInfo.currency}
            investmentLimit={programDetails.availableInvestmentLimit}
            onSubmit={editProgram}
          />
        </>
      )}
      <AssetEdit
        editError={editError}
        title={description.publicInfo.title}
        logo={{ src: description.publicInfo.logo }}
        description={description.publicInfo.description}
        onSubmit={editProgram}
      />
      {(description.ownerActions.canMakeSignalProviderFromProgram ||
        isSignalProgram) && (
        <SignalingEdit
          canMakeSignal={
            description.ownerActions.canMakeSignalProviderFromProgram
          }
          id={description.id}
          isSignalProgram={isSignalProgram}
          onApply={updateDescription}
          signalSuccessFee={signalSuccessFee}
          signalVolumeFee={signalVolumeFee}
        />
      )}
      <CloseAssetBlock
        label={t(`asset-settings.close-${assetType.toLowerCase()}.title`)}
        asset={assetType}
        canCloseAsset={description.ownerActions.canClose}
        id={closeId}
        closeAsset={closeProgram}
      />
    </>
  );
};

interface Props {
  editError?: boolean;
  createProgramInfo: ProgramCreateAssetPlatformInfo;
  description: ProgramFollowDetailsFull;
  updateDescription: VoidFunction;
  closeProgram: VoidFunction;
  editProgram: TUpdateProgramFunc;
}

const ProgramSettings = compose<React.ComponentType<Props & WithLoaderProps>>(
  withLoader,
  React.memo
)(_ProgramSettings);
export default ProgramSettings;
