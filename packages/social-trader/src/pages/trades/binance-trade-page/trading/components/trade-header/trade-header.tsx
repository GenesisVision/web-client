import { Center } from "components/center/center";
import AuthWidgets from "components/header/auth-widgets";
import { useHeaderInfo, useMenuItems } from "components/header/header.service";
import UnauthLinks from "components/header/unauth-links";
import { MenuNavigationItem } from "components/navigation/menu-navigation-item";
import NavigationMobileButton from "components/navigation/navigation-mobile/navigation-mobile-button";
import { ResponsiveContainer } from "components/responsive-container/responsive-container";
import { ProfileHeaderViewModel } from "gv-api-web";
import { useRouter } from "next/router";
import { SymbolSummarySmallContainer } from "pages/trades/binance-trade-page/trading/symbol-summary/symbol-summary-small";
import React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { rootMenuItem } from "routes/menu";

import styles from "./trade-header.module.scss";

interface Props {
  profileHeader?: ProfileHeaderViewModel;
}

export const TradeHeaderContainer = () => {
  const profileHeader = useHeaderInfo();
  return <TradeHeader profileHeader={profileHeader} />;
};

const _TradeHeader: React.FC<Props> = ({ profileHeader }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { showedMobileMenuItems } = useMenuItems();
  const { route, asPath } = useRouter();
  const backPath = asPath ? asPath : route;
  return (
    <Center className={styles["trade-header"]}>
      <NavigationMobileButton
        mobileMenuItems={showedMobileMenuItems}
        backPath={backPath}
        profileHeader={profileHeader}
        isAuthenticated={isAuthenticated}
      />
      <div className={styles["trade-header__root-menu-item"]}>
        <MenuNavigationItem item={rootMenuItem} popover />
      </div>
      <ResponsiveContainer enabledScreens={["desktop", "large-desktop"]}>
        <SymbolSummarySmallContainer />
      </ResponsiveContainer>
      {isAuthenticated ? (
        <AuthWidgets profileHeader={profileHeader} />
      ) : (
        <UnauthLinks backPath={backPath} />
      )}
    </Center>
  );
};
export const TradeHeader = React.memo(_TradeHeader);
