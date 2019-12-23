import { getBrokersProgramInfoLoaderData } from "components/assets/asset.helpers";
import { MigrationRequest } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { getProgramBrokersMethod } from "pages/programs/program-details/service/program-details.service";
import React from "react";

import CancelChangeBrokerForm from "./cancel-change-broker-form";

const _CancelChangeBrokerFormContainer: React.FC<
  ICancelChangeBrokerFormContainerProps
> = props => {
  const { data } = useApiRequest({
    fetchOnMountData: props.id,
    fetchOnMount: true,
    request: getProgramBrokersMethod
  });
  if (!data) return null;
  return (
    <CancelChangeBrokerForm
      loaderData={getBrokersProgramInfoLoaderData()}
      data={data}
      {...props}
    />
  );
};

export interface ICancelChangeBrokerFormContainerProps {
  id: string;
  isSignalProgram: boolean;
  onSubmit: () => void;
  leverage: number;
  migration: MigrationRequest;
}

const CancelChangeBrokerFormContainer = React.memo(
  _CancelChangeBrokerFormContainer
);
export default CancelChangeBrokerFormContainer;
