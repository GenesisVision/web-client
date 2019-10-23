import React, { useEffect } from "react";
import useApiRequest from "shared/hooks/api-request.hook";

import Active from "./active";
import { fetchActive, getActiveLoaderData } from "./service/active.service";

const _ActiveContainer: React.FC<Props> = ({ active }) => {
  const { data, sendRequest } = useApiRequest({
    request: fetchActive
  });
  useEffect(() => {
    sendRequest({ active });
  }, []);

  return <Active loaderData={getActiveLoaderData} data={data} />;
};

interface Props {
  active: string;
}

const ActiveContainer = React.memo(_ActiveContainer);
export default ActiveContainer;
