import "./app-layout.scss";

import { initOnResizeEvent } from "actions/ui-actions";
import HeaderContainer from "components/header/header.container";
import NotificationsContainer from "components/notifications/components/notifications-container";
import useRole from "hooks/use-role.hook";
import AlertMessageList from "modules/alert-message/components/alert-message-list/alert-message-list";
import React, { ComponentType, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  mobileMenuItems,
  mobileMenuItemsUnion,
  topMenuItems,
  topMenuItemsUnion
} from "routes/menu";

const _AppLayout: ComponentType<Props> = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initOnResizeEvent());
  }, []);
  // TODO remove after union
  let topMenu, mobileMenu;
  const role = useRole();
  if (!role) {
    topMenu = topMenuItemsUnion;
    mobileMenu = mobileMenuItemsUnion;
  } else {
    topMenu = topMenuItems;
    mobileMenu = mobileMenuItems;
  }

  return (
    <div className="app__wrapper root">
      <div className="app">
        <div className="app__header">
          <HeaderContainer
            topMenuItems={topMenu}
            mobileMenuItems={mobileMenu}
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
