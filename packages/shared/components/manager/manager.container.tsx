import "./manager.page.scss";

import { PublicProfile } from "gv-api-web";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useApiRequest from "shared/hooks/api-request.hook";

import ManagerPage from "./manager.page";
import ManagerPageLoader from "./manager.page.loader";
import { fetchManagerProfile } from "./services/manager.service";

const _ManagerContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { data, sendRequest, isPending } = useApiRequest<PublicProfile>({
    request: () => dispatch(fetchManagerProfile())
  });
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <ManagerPage
      loader={<ManagerPageLoader />}
      condition={!isPending && !!data}
      managerProfile={data!}
    />
  );
};

const ManagerContainer = React.memo(_ManagerContainer);
export default ManagerContainer;
