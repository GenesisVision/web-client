import "./follow-settings.scss";

import {
  BrokersProgramInfo,
  ProgramDetailsFull
} from "gv-api-web";
import AssetEdit from "modules/asset-settings/asset-edit";
import CloseAssetBlock from "modules/asset-settings/close-asset/close-asset-block";
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
import { TUpdateFollowFunc } from "./follow-settings.page";
import SignalingEdit, { IFollowSignalFormValues } from "./signaling-edit";

const _FollowSettings: React.FC<Props> = ({
  followsInfo,
  cancelChangeBroker,
  brokersInfo,
  details,
  changeBroker,
  editFollow,
  closePeriod,
  closeFollow,
  changeSignaling
}) => {
  const [t] = useTranslation();
  const signalSuccessFee = details.signalSettings
    ? details.signalSettings.signalSuccessFee
    : undefined;
  const signalVolumeFee = details.signalSettings
    ? details.signalSettings.signalVolumeFee
    : undefined;
  return (
    <>
      {details.personalDetails && details.personalDetails.ownerActions && (
        <ChangePassword
          condition={
            details.personalDetails.ownerActions.canChangePassword &&
            details.personalDetails.ownerActions.canClose
          }
          title={details.title}
          id={details.id}
        />
      )}
      <CancelChangeBroker
        condition={
          details.personalDetails && !!details.personalDetails.migration
        }
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
      <SignalingEdit
        onSubmit={changeSignaling}
        signalSuccessFee={signalSuccessFee}
        signalVolumeFee={signalVolumeFee}
      />
      <AssetEdit
        title={details.title}
        logo={{ src: details.logo }}
        description={details.description}
        onSubmit={editFollow}
      />
      <CloseAssetBlock
        label={t("asset-settings.close-follow.title")}
        asset={ASSET.FOLLOW}
        canCloseAsset={
          details.personalDetails &&
          details.personalDetails.ownerActions &&
          details.personalDetails.ownerActions.canClose
        }
        id={details.id}
        closeAsset={closeFollow}
      />
    </>
  );
};

interface Props {
  followsInfo: any //TODO ProgramsInfo;
  details: ProgramDetailsFull;
  brokersInfo: BrokersProgramInfo;
  changeSignaling: (
    values: IFollowSignalFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  closePeriod: () => void;
  closeFollow: () => void;
  changeBroker: (
    values: ChangeBrokerFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  editFollow: TUpdateFollowFunc;
  cancelChangeBroker: () => void;
}

const FollowSettings = compose<React.ComponentType<Props & WithLoaderProps>>(
  withLoader,
  React.memo
)(_FollowSettings);
export default FollowSettings;
