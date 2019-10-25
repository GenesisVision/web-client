import "./app-layout.scss";

import qs from "qs";
import React, { ComponentType, useEffect } from "react";
import { useDispatch } from "react-redux";
import { initOnResizeEvent } from "shared/actions/ui-actions";
import HeaderContainer from "shared/components/header/header.container";
import NotificationsContainer from "shared/components/notifications/components/notifications-container";
import { REF_PARAM_NAME } from "shared/constants/constants";
import AlertMessageList from "shared/modules/alert-message/components/alert-message-list/alert-message-list";
import { setRef } from "shared/utils/ref";

const _AppLayout: ComponentType<Props> = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const searchString = document.location.search.substring(1);
    const params = qs.parse(searchString);
    if (params[REF_PARAM_NAME]) setRef(params[REF_PARAM_NAME]);
    dispatch(initOnResizeEvent());
  }, []);
  return (
    <div className="app__wrapper root">
      <div className="app">
        <div className="app__header">
          <HeaderContainer />
        </div>
        <div className="app__main">{children}</div>
        <NotificationsContainer />
        <AlertMessageList />
      </div>
      <div id="modal-root" />
    </div>
  );
};

interface Props {}

const AppLayout = React.memo(_AppLayout);
export default AppLayout;
