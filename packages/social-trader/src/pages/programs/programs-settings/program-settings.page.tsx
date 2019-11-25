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

import { ChangeBrokerFormValues } from "./change-broker/change-broker-form";
import ProgramSettings from "./program-settings";
import {
  changeBrokerMethod,
  redirectToProgram
} from "./services/program-settings.service";
import { IProgramSignalFormValues } from "./signaling-edit";

const _ProgramsEditPage: React.FC = () => {
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
  const { sendRequest: changeBroker } = useApiRequest({
    middleware: [updateDescription],
    request: changeBrokerMethod,
    successMessage: "program-settings.notifications.broker-success"
  });
  const { sendRequest: cancelChangeBroker } = useApiRequest({
    middleware: [updateDescription],
    request: changeBrokerMethod,
    successMessage: "program-settings.notifications.broker-success"
  });
  const { sendRequest: getProgramBrokers, data: brokersInfo } = useApiRequest({
    request: getProgramBrokersMethod
  });

  useEffect(() => {
    description && getProgramBrokers(description.id);
  }, [description]);

  const changeSignaling = useCallback(
    ({ volumeFee, successFee }: IProgramSignalFormValues) =>
      editSignal({
        id: description!.id,
        successFee: successFee!,
        volumeFee: volumeFee!
      }),
    [description, updateDescription]
  );

  const handleChangeBroker = useCallback(
    (
      { brokerAccountTypeId, leverage }: ChangeBrokerFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      changeBroker(
        {
          id: description!.id,
          brokerAccountTypeId,
          leverage
        },
        setSubmitting
      );
    },
    [description, updateDescription]
  );

  const handleCancelChangeBroker = useCallback(() => {
    cancelChangeBroker(description!.id);
  }, [description, updateDescription]);

  return (
    <AssetSettingsPage
      redirectToAsset={redirectToProgram}
      asset={ASSET.PROGRAM}
      description={description as AssetDescriptionType}
      dispatchDescription={updateDescription}
      settingsBlocks={(editProgram: any, applyCloseAsset: any) => (
        <ProgramSettings
          condition={!!description && !!brokersInfo && !!createProgramInfo}
          createProgramInfo={createProgramInfo}
          closePeriod={updateDescription}
          closeProgram={applyCloseAsset}
          details={description!}
          editProgram={editProgram}
          brokersInfo={brokersInfo!}
          changeBroker={handleChangeBroker}
          loader={<AssetSettingsLoader />}
          changeSignaling={changeSignaling}
          cancelChangeBroker={handleCancelChangeBroker}
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

const ProgramSettingsPage = React.memo(_ProgramsEditPage);
export default ProgramSettingsPage;
