import classNames from "classnames";
import { Center } from "components/center/center";
import HeaderIcon from "components/header/header-icon";
import { useMenuItems } from "components/header/header.service";
import { SearchIcon } from "components/icon/search-icon";
import Navigation from "components/navigation/navigation";
import NavigationMobileButton from "components/navigation/navigation-mobile/navigation-mobile-button";
import { ProfileHeaderViewModel } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import dynamic from "next/dist/next-server/lib/dynamic";
import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

import styles from "./header.module.scss";

const AuthWidgets = dynamic(() => import("components/header/auth-widgets"));
const UnauthLinks = dynamic(() => import("components/header/unauth-links"));
const HeaderSearchInput = dynamic(() =>
  import("components/header/header-search-input")
);

const HeaderLeft: React.FC<{
  backPath: string;
  profileHeader?: ProfileHeaderViewModel;
}> = React.memo(({ backPath, profileHeader }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { showedMobileMenuItems, showedTopMenuItems } = useMenuItems();

  const [openSearch, setSearchIsOpen, setSearchIsClose] = useIsOpen();
  return (
    <div className={styles["header__left"]}>
      <NavigationMobileButton
        mobileMenuItems={showedMobileMenuItems}
        backPath={backPath}
        profileHeader={profileHeader}
        isAuthenticated={isAuthenticated}
      />
      <Navigation
        menuItems={showedTopMenuItems}
        className={classNames(styles["header__navigation"], {
          [styles["header__navigation--search"]]: openSearch
        })}
      />
      <div
        onClick={setSearchIsOpen}
        className={classNames(styles["header__search-container"], {
          [styles["header__search-container--search"]]: openSearch
        })}
      >
        <HeaderIcon>
          {openSearch ? (
            <HeaderSearchInput setSearchIsClose={setSearchIsClose} />
          ) : (
            <div className={styles["header__search-button"]}>
              <SearchIcon />
            </div>
          )}
        </HeaderIcon>
      </div>
    </div>
  );
});

const _Header: React.FC<Props> = ({ profileHeader }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { route, asPath } = useRouter();
  const backPath = asPath ? asPath : route;
  return (
    <Center className={styles["header"]}>
      <HeaderLeft backPath={backPath} profileHeader={profileHeader} />
      <div className={styles["header__right"]}>
        {isAuthenticated ? (
          <AuthWidgets profileHeader={profileHeader} />
        ) : (
          <UnauthLinks backPath={backPath} />
        )}
      </div>
    </Center>
  );
};

export interface Props {
  profileHeader?: ProfileHeaderViewModel;
  backPath: string;
}

const Header = React.memo(_Header);
export default Header;
