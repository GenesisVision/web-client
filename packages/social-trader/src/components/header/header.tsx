import "./header.scss";

import { logout } from "components/auth/signin/signin.service";
import { GLOBAL_SEARCH_ROUTE } from "components/global-search/global-search.routes";
import GVButton from "components/gv-button";
import HeaderIcon from "components/header/header-icon";
import { Icon } from "components/icon/icon";
import { SearchIcon } from "components/icon/search-icon";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Navigation from "components/navigation/navigation";
import NavigationMobile from "components/navigation/navigation-mobile/navigation-mobile";
import NotificationsWidget from "components/notifications-widget/notifications-widget";
import ProfileWidget from "components/profile-widget/profile-widget";
import { ProfileWidgetLoader } from "components/profile-widget/profile-widget.loader";
import WalletWidgetContainer from "components/wallet-widget/wallet-widget-container";
import { ProfileHeaderViewModel } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import { useRouter } from "next/router";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "routes/app.routes";
import { mobileMenuItems, topMenuItems } from "routes/menu";
import { getRandomInteger } from "utils/helpers";

const _Header: React.FC<Props> = ({ profileHeader }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { linkCreator } = useToLink();
  const dispatch = useDispatch();
  const handlerLogout = useCallback(() => dispatch(logout), []);
  const [isOpen, setOpen, setClose] = useIsOpen();
  const [t] = useTranslation();
  const { route, asPath } = useRouter();
  const backPath = asPath ? asPath : route;
  return (
    <div className="header">
      <div className="header__left">
        <div className="navigation__menu" onClick={setOpen}>
          <Icon type="menu" />
        </div>
        <Navigation menuItems={topMenuItems} className="header__navigation" />
      </div>
      <div className="header__center">
        <Link to={linkCreator(GLOBAL_SEARCH_ROUTE, backPath)}>
          <HeaderIcon>
            <SearchIcon />
          </HeaderIcon>
        </Link>
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
              logout={handlerLogout}
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
      <NavigationMobile
        mobileMenuItems={mobileMenuItems}
        backPath={backPath}
        logout={handlerLogout}
        isOpenNavigation={isOpen}
        profileHeader={profileHeader}
        isAuthenticated={isAuthenticated}
        onClose={setClose}
      />
    </div>
  );
};

export interface Props {
  profileHeader?: ProfileHeaderViewModel;
  backPath: string;
}

const Header = React.memo(_Header);
export default Header;
