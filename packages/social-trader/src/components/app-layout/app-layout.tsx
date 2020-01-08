import "./app-layout.scss";

import { initOnResizeEvent } from "actions/ui-actions";
import GlobalSearchResultContainer from "components/global-search/components/global-search-result/global-search-result-container";
import { globalSearchInputSelector } from "components/global-search/reducers/global-search.reducer";
import HeaderContainer from "components/header/header.container";
import NotificationsContainer from "components/notifications/components/notifications-container";
import AlertMessageList from "modules/alert-message/components/alert-message-list/alert-message-list";
import React, { ComponentType, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const _AppLayout: ComponentType<Props> = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initOnResizeEvent());
  }, []);
  const searchValue = useSelector(globalSearchInputSelector);
  return (
    <div className="app__wrapper root">
      <div className="app">
        <div className="app__header">
          <HeaderContainer />
        </div>
        <div className="app__main">
          {!!searchValue ? (
            <GlobalSearchResultContainer query={searchValue} />
          ) : (
            children
          )}
        </div>
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
