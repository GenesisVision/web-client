import "./app-layout.scss";

import { globalSearchInputSelector } from "components/global-search/reducers/global-search.reducer";
import HeaderContainer from "components/header/header.container";
import AlertMessageList from "modules/alert-message/components/alert-message-list/alert-message-list";
import dynamic from "next/dist/next-server/lib/dynamic";
import React, { ComponentType } from "react";
import { useSelector } from "react-redux";

const GlobalSearchResultContainer = dynamic(() =>
  import(
    "components/global-search/components/global-search-result/global-search-result-container"
  )
);

const _AppLayout: ComponentType<Props> = ({ children }) => {
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
        <AlertMessageList />
      </div>
      <div id="modal-root" />
    </div>
  );
};

interface Props {}

const AppLayout = React.memo(_AppLayout);
export default AppLayout;
