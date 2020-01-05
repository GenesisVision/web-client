import "./header.scss";

import classNames from "classnames";
import GVButton from "components/gv-button";
import HeaderIcon from "components/header/header-icon";
import { HeaderSearchInput } from "components/header/header-search-input";
import { SearchIcon } from "components/icon/search-icon";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Navigation from "components/navigation/navigation";
import NavigationMobileButton from "components/navigation/navigation-mobile/navigation-mobile-button";
import NotificationsWidget from "components/notifications-widget/notifications-widget";
import ProfileWidget from "components/profile-widget/profile-widget";
import { ProfileWidgetLoader } from "components/profile-widget/profile-widget.loader";
import WalletWidgetContainer from "components/wallet-widget/wallet-widget-container";
import { ProfileHeaderViewModel } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import { useRouter } from "next/router";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "routes/app.routes";
import { mobileMenuItems, topMenuItems } from "routes/menu";
import { getRandomInteger } from "utils/helpers";

const _Header: React.FC<Props> = ({ profileHeader }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const [openSearch, setSearchIsOpen, setSearchIsClose] = useIsOpen();
  const { route, asPath } = useRouter();
  const backPath = asPath ? asPath : route;
  return (
    <div className="header">
      <div
        className={classNames("header__left", {
          "header__left--search": openSearch
        })}
      >
        <NavigationMobileButton
          mobileMenuItems={mobileMenuItems}
          backPath={backPath}
          profileHeader={profileHeader}
          isAuthenticated={isAuthenticated}
        />
        <Navigation
          menuItems={topMenuItems}
          className={classNames("header__navigation", {
            "header__navigation--search": openSearch
          })}
        />
        <div
          onClick={setSearchIsOpen}
          className={classNames("header__search-container", {
            "header__search-container--search": openSearch
          })}
        >
          <HeaderIcon>
            {openSearch ? (
              <HeaderSearchInput setSearchIsClose={setSearchIsClose} />
            ) : (
              <div className="header__search-button">
                <SearchIcon />
              </div>
            )}
          </HeaderIcon>
        </div>
      </div>
      <div className="header__right">
        {isAuthenticated ? (
          <>
            <WalletWidgetContainer className="header__wallet" />
            <NotificationsWidget
              loaderData={getRandomInteger(0, 1000)}
              data={profileHeader && profileHeader.notificationsCount}
            />
            <ProfileWidget
              condition={!!profileHeader}
              loader={<ProfileWidgetLoader className="header__profile" />}
              profileHeader={profileHeader!}
              className="header__profile"
            />
          </>
        ) : (
          <div className="header__buttons">
            <Link
              to={{
                pathname: LOGIN_ROUTE,
                state: backPath
              }}
            >
              <GVButton variant="outlined" color="secondary">
                {t("auth.login.title")}
              </GVButton>
            </Link>
            <Link to={linkCreator(SIGNUP_ROUTE)}>
              <GVButton variant="contained" color="primary">
                {t("auth.signup.title")}
              </GVButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export interface Props {
  profileHeader?: ProfileHeaderViewModel;
  backPath: string;
}

const Header = React.memo(_Header);
export default Header;
