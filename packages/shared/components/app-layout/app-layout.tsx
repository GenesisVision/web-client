import "./app-layout.scss";

import React, { ComponentType, useEffect } from "react";
import { useDispatch } from "react-redux";
import { initOnResizeEvent } from "shared/actions/ui-actions";
import HeaderContainer from "shared/components/header/header.container";
import NotificationsContainer from "shared/components/notifications/components/notifications-container";
import useRole from "shared/hooks/use-role.hook";
import AlertMessageList from "shared/modules/alert-message/components/alert-message-list/alert-message-list";
import {
  mobileMenuItems,
  mobileMenuItemsUnion,
  topMenuItems,
  topMenuItemsUnion
} from "shared/routes/menu";

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
