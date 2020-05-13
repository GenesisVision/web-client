import {
  GlobalSearchContext,
  GlobalSearchContextProvider
} from "components/global-search/global-search-context";
import HeaderContainer from "components/header/header.container";
import AlertMessageList from "modules/alert-message/components/alert-message-list/alert-message-list";
import dynamic from "next/dist/next-server/lib/dynamic";
import React, { ComponentType, useContext } from "react";

import styles from "./app-layout.module.scss";

const GlobalSearchResultContainer = dynamic(() =>
  import(
    "components/global-search/components/global-search-result/global-search-result-container"
  )
);

const PageContent: React.FC = ({ children }) => {
  const { searchValue } = useContext(GlobalSearchContext);
  return !!searchValue ? (
    <GlobalSearchResultContainer query={searchValue} />
  ) : (
    <>{children}</>
  );
};

const _AppLayout: ComponentType<Props> = ({ children }) => {
  return (
    <GlobalSearchContextProvider>
      <div className={styles["app__wrapper root"]}>
        <div className={styles["app"]}>
          <div className={styles["app__header"]}>
            <HeaderContainer />
          </div>
          <div className={styles["app__main"]}>
            <PageContent>{children}</PageContent>
          </div>
          <AlertMessageList />
        </div>
        <div id="modal-root" />
      </div>
    </GlobalSearchContextProvider>
  );
};

interface Props {}

const AppLayout = React.memo(_AppLayout);
export default AppLayout;
