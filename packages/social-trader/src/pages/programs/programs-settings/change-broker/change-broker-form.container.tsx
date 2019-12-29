import { getBrokersProgramInfoLoaderData } from "components/assets/asset.helpers";
import useApiRequest from "hooks/api-request.hook";
import { getProgramBrokersMethod } from "pages/programs/program-details/service/program-details.service";
import React from "react";
import { SetSubmittingType } from "utils/types";

import ChangeBrokerForm, { ChangeBrokerFormValues } from "./change-broker-form";

const _ChangeBrokerForm: React.FC<IChangeBrokerFormContainerProps> = props => {
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
      {...props}
    />
  );
};

export interface IChangeBrokerFormContainerProps {
  isSignalProgram: boolean;
  onSubmit: (
    values: ChangeBrokerFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  id: string;
  currentLeverage: number;
}

const ChangeBrokerFormContainer = React.memo(_ChangeBrokerForm);
export default ChangeBrokerFormContainer;
