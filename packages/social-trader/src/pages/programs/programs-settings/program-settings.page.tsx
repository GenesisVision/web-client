import { IImageValue } from "components/form/input-image/input-image";
import { TradesDelay } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import AssetSettingsLoader from "modules/asset-settings/asset-settings.loader";
import AssetSettingsPage from "modules/asset-settings/asset-settings.page";
import { AssetDescriptionType } from "modules/asset-settings/asset-settings.types";
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
  cancelChangeBrokerMethod,
  changeBrokerMethod,
  redirectToProgram
} from "./services/program-settings.service";

const _ProgramsEditPage: React.FC = () => {
  const dispatch = useDispatch();

  const createProgramInfo = useSelector(createProgramInfoSelector);
  const description = useSelector(programDescriptionSelector);

  const updateDescription = useCallback(
    () => dispatch(dispatchProgramDescriptionWithId(description!.id)),
    [description]
  );

  const { sendRequest: changeBroker } = useApiRequest({
    middleware: [updateDescription],
    request: changeBrokerMethod,
    successMessage: "program-settings.notifications.broker-success"
  });
  const { sendRequest: cancelChangeBroker } = useApiRequest({
    middleware: [updateDescription],
    request: cancelChangeBrokerMethod,
    successMessage: "program-settings.notifications.broker-success"
  });
  const { sendRequest: getProgramBrokers, data: brokersInfo } = useApiRequest({
    request: getProgramBrokersMethod
  });

  useEffect(() => {
    description && getProgramBrokers(description.id);
  }, [description]);

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
          updateDescription={updateDescription}
          condition={!!description && !!brokersInfo && !!createProgramInfo}
          createProgramInfo={createProgramInfo}
          closeProgram={applyCloseAsset}
          description={description!}
          editProgram={editProgram}
          brokersInfo={brokersInfo!}
          changeBroker={handleChangeBroker}
          loader={<AssetSettingsLoader />}
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
