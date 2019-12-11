import "components/details/details.scss";

import { IImageValue } from "components/form/input-image/input-image";
import { TradesDelay } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import AssetSettingsLoader from "modules/asset-settings/asset-settings.loader";
import AssetSettingsPage from "modules/asset-settings/asset-settings.page";
import { AssetDescriptionType } from "modules/asset-settings/asset-settings.types";
import { programEditSignal } from "modules/program-signal/program-edit-signal/services/program-edit-signal.service";
import { programDescriptionSelector } from "pages/programs/program-details/reducers/description.reducer";
import {
  dispatchProgramDescriptionWithId,
  getProgramBrokersMethod
} from "pages/programs/program-details/service/program-details.service";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProgramInfoSelector } from "reducers/platform-reducer";
import { ASSET } from "shared/constants/constants";
import { SetSubmittingType } from "utils/types";

import { IProgramSignalFormValues } from "../../programs/programs-settings/signaling-edit";
import AccountSettings from "./account-settings";
import { ChangeBrokerFormValues } from "./change-broker/change-broker-form";
import {
  cancelChangeBrokerMethod,
  changeBrokerMethod,
  redirectToProgram
} from "./services/account-settings.service";

const _AccountSettingsPage: React.FC = () => {
  const dispatch = useDispatch();

  const createProgramInfo = useSelector(createProgramInfoSelector);
  const description = useSelector(programDescriptionSelector);

  const updateDescription = useCallback(
    () => dispatch(dispatchProgramDescriptionWithId(description!.id)),
    [description]
  );

  const { sendRequest: editSignal } = useApiRequest({
    middleware: [updateDescription],
    request: programEditSignal,
    successMessage: "program-edit-signal.success-alert-message"
  });

  const changeSignaling = useCallback(
    ({ volumeFee, successFee }: IProgramSignalFormValues) =>
      editSignal({
        id: description!.id,
        successFee: successFee!,
        volumeFee: volumeFee!
      }),
    [description, updateDescription]
  );

  return (
    <AssetSettingsPage
      redirectToAsset={redirectToProgram}
      asset={ASSET.PROGRAM}
      description={description as AssetDescriptionType}
      dispatchDescription={updateDescription}
      settingsBlocks={(editProgram: any, applyCloseAsset: any) => (
        <AccountSettings
          condition={!!description && !!createProgramInfo}
          closeProgram={applyCloseAsset}
          details={description!}
          loader={<AssetSettingsLoader />}
          changeSignaling={changeSignaling}
        />
      )}
    />
  );
};

export type TUpdateProgramFunc = (
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

const AccountSettingsPage = React.memo(_AccountSettingsPage);
export default AccountSettingsPage;
