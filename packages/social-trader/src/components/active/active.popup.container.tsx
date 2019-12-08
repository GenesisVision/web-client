import "./active.scss";

import useApiRequest from "hooks/api-request.hook";
import React from "react";

import Active from "./active";
import { fetchActive, getActiveLoaderData } from "./service/active.service";

const _ActivePopupContainer: React.FC<Props> = ({ active }) => {
  const { data } = useApiRequest({
    request: () => fetchActive({ active }),
    fetchOnMount: true
  });
  return (
    <div className="active__popup">
      <Active loaderData={getActiveLoaderData} data={data} />
    </div>
  );
};

interface Props {
  active: string;
}

const ActivePopupContainer = React.memo(_ActivePopupContainer);
export default ActivePopupContainer;
