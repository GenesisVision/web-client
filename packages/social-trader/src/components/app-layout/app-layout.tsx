import "./app-layout.scss";

import { initOnResizeEvent } from "actions/ui-actions";
import { globalSearchInputSelector } from "components/global-search/reducers/global-search.reducer";
import HeaderContainer from "components/header/header.container";
import NotificationsContainer from "components/notifications/components/notifications-container";
import AlertMessageList from "modules/alert-message/components/alert-message-list/alert-message-list";
import { useAmp } from "next/amp";
import dynamic from "next/dist/next-server/lib/dynamic";
import Head from "next/head";
import React, { ComponentType, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const GlobalSearchResultContainer = dynamic(() =>
  import(
    "components/global-search/components/global-search-result/global-search-result-container"
  )
);

const _AppLayout: ComponentType<Props> = ({ children }) => {
  const isAmp = useAmp();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initOnResizeEvent());
  }, []);
  const searchValue = useSelector(globalSearchInputSelector);
  return (
    <>
      {isAmp && (
        <Head>
          <style amp-custom>
            {`
            body {
              background-color: #131e26;
              font-family: Montserrat, sans-serif;
              color: white;
              font-size: 15px;
              line-height: 28px;
            }
            h1, h2, h3, h4, h5  {
              margin: 0;
            }
            h1 {
              font-size: 25px;
            }
            h2 {
              font-size: 20px;
            }
            .app {
              padding:10px;
            }
          `}
          </style>
        </Head>
      )}
      <div className="app__wrapper root">
        <div className="app">
          {!isAmp && (
            <div className="app__header">
              <HeaderContainer />
            </div>
          )}
          <div className="app__main">
            {!!searchValue ? (
              <GlobalSearchResultContainer query={searchValue} />
            ) : (
              children
            )}
          </div>
          {!isAmp && (
            <>
              <NotificationsContainer />
              <AlertMessageList />
            </>
          )}
        </div>
        <div id="modal-root" />
      </div>
    </>
  );
};

interface Props {}

const AppLayout = React.memo(_AppLayout);
export default AppLayout;
