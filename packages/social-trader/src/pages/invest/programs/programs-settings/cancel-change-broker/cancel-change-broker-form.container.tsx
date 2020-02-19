import { getBrokersProgramInfoLoaderData } from "components/assets/asset.helpers";
import { MigrationRequest } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { getProgramBrokersMethod } from "pages/invest/programs/program-details/service/program-details.service";
import { cancelChangeBrokerMethod } from "pages/invest/programs/programs-settings/services/program-settings.service";
import React, { useCallback } from "react";
import { postponeCallback } from "utils/hook-form.helpers";

import CancelChangeBrokerForm from "./cancel-change-broker-form";

const _CancelChangeBrokerFormContainer: React.FC<ICancelChangeBrokerFormContainerProps> = props => {
  const { id, onApply } = props;
  const { sendRequest: cancelChangeBroker, errorMessage } = useApiRequest({
    middleware: [postponeCallback(onApply)],
    request: cancelChangeBrokerMethod,
    successMessage: "program-settings.notifications.broker-success"
  });
  const handleCancelChangeBroker = useCallback(() => {
    return cancelChangeBroker(id);
  }, [id]);
  const { data } = useApiRequest({
    fetchOnMountData: props.id,
    fetchOnMount: true,
    request: getProgramBrokersMethod
  });
  if (!data) return null;
  return (
    <CancelChangeBrokerForm
      errorMessage={errorMessage}
      onSubmit={handleCancelChangeBroker}
      loaderData={getBrokersProgramInfoLoaderData()}
      data={data}
      {...props}
    />
  );
};

export interface ICancelChangeBrokerFormContainerProps {
  onApply: VoidFunction;
  id: string;
  isSignalProgram: boolean;
  leverage: number;
  migration: MigrationRequest;
}

const CancelChangeBrokerFormContainer = React.memo(
  _CancelChangeBrokerFormContainer
);
export default CancelChangeBrokerFormContainer;
