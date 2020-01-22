import { getBrokersProgramInfoLoaderData } from "components/assets/asset.helpers";
import useApiRequest from "hooks/api-request.hook";
import { getProgramBrokersMethod } from "pages/invest/programs/program-details/service/program-details.service";
import { changeBrokerMethod } from "pages/invest/programs/programs-settings/services/program-settings.service";
import React, { useCallback } from "react";
import { SetSubmittingType } from "utils/types";

import ChangeBrokerForm, { ChangeBrokerFormValues } from "./change-broker-form";

const _ChangeBrokerForm: React.FC<IChangeBrokerFormContainerProps> = props => {
  const { id, onApply } = props;
  const { sendRequest: changeBroker } = useApiRequest({
    middleware: [onApply],
    request: changeBrokerMethod,
    successMessage: "program-settings.notifications.broker-success"
  });
  const handleChangeBroker = useCallback(
    (
      { brokerAccountTypeId, leverage }: ChangeBrokerFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      changeBroker(
        {
          id,
          brokerAccountTypeId,
          leverage
        },
        setSubmitting
      );
    },
    [id]
  );
  const { data } = useApiRequest({
    fetchOnMountData: props.id,
    fetchOnMount: true,
    request: getProgramBrokersMethod
  });
  if (!data) return null;
  return (
    <ChangeBrokerForm
      loaderData={getBrokersProgramInfoLoaderData()}
      data={data}
      onSubmit={handleChangeBroker}
      {...props}
    />
  );
};

export interface IChangeBrokerFormContainerProps {
  onApply: VoidFunction;
  isSignalProgram: boolean;
  id: string;
  currentLeverage: number;
}

const ChangeBrokerFormContainer = React.memo(_ChangeBrokerForm);
export default ChangeBrokerFormContainer;
