import { getBrokersProgramInfoLoaderData } from "components/assets/asset.helpers";
import useApiRequest from "hooks/api-request.hook";
import { getProgramBrokersMethod } from "pages/invest/programs/program-details/service/program-details.service";
import { changeBrokerMethod } from "pages/invest/programs/programs-settings/services/program-settings.service";
import React, { useCallback } from "react";
import { postponeCallback } from "utils/hook-form.helpers";

import ChangeBrokerForm from "./change-broker-form";
import { ChangeBrokerFormValues } from "./change-broker-form.helpers";

export interface IChangeBrokerFormContainerProps {
  isExchange?: boolean;
  onApply: VoidFunction;
  isSignalProgram: boolean;
  id: string;
  currentLeverage: number;
}

const _ChangeBrokerForm: React.FC<IChangeBrokerFormContainerProps> = props => {
  const { isExchange, id, onApply } = props;
  const onCloseMiddleware = postponeCallback(onApply);
  const { sendRequest: changeBroker, errorMessage } = useApiRequest({
    middleware: [onCloseMiddleware],
    request: changeBrokerMethod,
    successMessage: "asset-settings:notifications.broker-success"
  });
  const handleChangeBroker = useCallback(
    (values: ChangeBrokerFormValues) =>
      changeBroker({
        ...values,
        id
      }),
    [id]
  );
  const { data } = useApiRequest({
    fetchOnMountData: id,
    fetchOnMount: true,
    request: getProgramBrokersMethod
  });
  if (!data) return null;
  return (
    <ChangeBrokerForm
      isExchange={isExchange}
      errorMessage={errorMessage}
      loaderData={getBrokersProgramInfoLoaderData()}
      data={data}
      onSubmit={handleChangeBroker}
      {...props}
    />
  );
};

export interface IChangeBrokerFormContainerProps {
  isExchange?: boolean;
  onApply: VoidFunction;
  isSignalProgram: boolean;
  id: string;
  currentLeverage: number;
}

const ChangeBrokerFormContainer = React.memo(_ChangeBrokerForm);
export default ChangeBrokerFormContainer;
