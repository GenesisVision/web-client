import "./app-layout.scss";

import { initOnResizeEvent } from "actions/ui-actions";
import HeaderContainer from "components/header/header.container";
import NotificationsContainer from "components/notifications/components/notifications-container";
import AlertMessageList from "modules/alert-message/components/alert-message-list/alert-message-list";
import React, { ComponentType, useEffect } from "react";
import { useDispatch } from "react-redux";
import { mobileMenuItemsUnion, topMenuItemsUnion } from "routes/menu";

const _AppLayout: ComponentType<Props> = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initOnResizeEvent());
  }, []);

  return (
    <div className="app__wrapper root">
      <div className="app">
        <div className="app__header">
          <HeaderContainer
            topMenuItems={topMenuItemsUnion}
            mobileMenuItems={mobileMenuItemsUnion}
          />
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
