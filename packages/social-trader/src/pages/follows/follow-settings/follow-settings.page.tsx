import "components/details/details.scss";
import "components/assets/fields/fields.scss";

import { IImageValue } from "components/form/input-image/input-image";
import { BrokersProgramInfo, TradesDelay } from "gv-api-web";
import AssetSettingsLoader from "modules/asset-settings/asset-settings.loader";
import AssetSettingsPage from "modules/asset-settings/asset-settings.page";
import { AssetDescriptionType } from "modules/asset-settings/asset-settings.types";
import { programEditSignal } from "modules/program-signal/program-edit-signal/services/program-edit-signal.service";
import { followDescriptionSelector } from "pages/follows/follow-details/reducers/description.reducer";
import {
  dispatchFollowDescription,
  getFollowBrokers
} from "pages/follows/follow-details/services/follow-details.service";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { programsInfoSelector } from "reducers/platform-reducer";
import { ASSET } from "shared/constants/constants";
import { ReduxDispatch, SetSubmittingType } from "utils/types";

import { ChangeBrokerFormValues } from "./change-broker/change-broker-form";
import FollowSettings from "./follow-settings";
import {
  cancelChangeBrokerMethod,
  changeBrokerMethod,
  redirectToFollow
} from "./services/follow-settings.service";
import { IFollowSignalFormValues } from "./signaling-edit";

const _FollowsEditPage: React.FC = () => {
  const dispatch = useDispatch<ReduxDispatch>();
  const followsInfo = useSelector(programsInfoSelector);
  const description = useSelector(followDescriptionSelector);
  const [brokersInfo, setBrokersInfo] = useState<
    BrokersProgramInfo | undefined
  >(undefined);
  useEffect(() => {
    description && getFollowBrokers(description.id).then(setBrokersInfo);
  }, [description]);
  const changeSignaling = useCallback(
    ({ volumeFee, successFee }: IFollowSignalFormValues) =>
      dispatch(
        // @ts-ignore
        programEditSignal({
          id: description!.id,
          successFee: successFee!,
          volumeFee: volumeFee!
        })
      ).then(dispatchDescriptionHandle),
    [description]
  );
  const changeBroker = useCallback(
    (
      { brokerAccountTypeId, leverage }: ChangeBrokerFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      dispatch(
        // @ts-ignore
        changeBrokerMethod(
          description!.id,
          brokerAccountTypeId,
          leverage,
          setSubmitting
        )
      ).then(dispatchDescriptionHandle);
    },
    [description]
  );
  const cancelChangeBroker = useCallback(() => {
    // @ts-ignore
    dispatch(cancelChangeBrokerMethod(description!.id)).then(
      dispatchDescriptionHandle
    );
  }, [description]);
  const dispatchDescriptionHandle = useCallback(() => {
    description && dispatch(dispatchFollowDescription(description.id)());
  }, [description]);
  return (
    <AssetSettingsPage
      redirectToAsset={redirectToFollow}
      asset={ASSET.FOLLOW}
      description={description as AssetDescriptionType}
      dispatchDescription={dispatchDescriptionHandle}
      settingsBlocks={(editFollow: any, applyCloseAsset: any) => (
        <FollowSettings
          condition={!!description && !!brokersInfo && !!followsInfo}
          followsInfo={followsInfo}
          closePeriod={dispatchDescriptionHandle}
          closeFollow={applyCloseAsset}
          details={description!}
          editFollow={editFollow}
          brokersInfo={brokersInfo!}
          changeBroker={changeBroker}
          loader={<AssetSettingsLoader />}
          changeSignaling={changeSignaling}
          cancelChangeBroker={cancelChangeBroker}
        />
      )}
    />
  );
};

export type TUpdateFollowFunc = (
  values: {
    tradesDelay?: TradesDelay;
    description?: string;
    logo?: IImageValue;
    investmentLimit?: number;
    stopOutLevel?: number;
    entryFee?: number;
    successFee?: number;
  },
  setSubmitting: SetSubmittingType,
  resetForm?: () => void
) => void;

const FollowSettingsPage = _FollowsEditPage;
export default FollowSettingsPage;
