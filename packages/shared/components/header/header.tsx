import "./header.scss";

import { ProfileHeaderViewModel } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "shared/components/auth/signin/signin.service";
import { GLOBAL_SEARCH_ROUTE } from "shared/components/global-search/global-search.routes";
import GVButton from "shared/components/gv-button";
import { Icon } from "shared/components/icon/icon";
import { SearchIcon } from "shared/components/icon/search-icon";
import Navigation from "shared/components/navigation/navigation";
import NavigationMobile from "shared/components/navigation/navigation-mobile/navigation-mobile";
import NotificationsWidget from "shared/components/notifications-widget/notifications-widget";
import ProfileWidget from "shared/components/profile-widget/profile-widget";
import { ProfileWidgetLoader } from "shared/components/profile-widget/profile-widget.loader";
import WalletWidgetContainer from "shared/components/wallet-widget/wallet-widget-container";
import useIsOpen from "shared/hooks/is-open.hook";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "shared/routes/app.routes";
import { TMenuItem } from "shared/routes/menu";
import { getRandomInteger } from "shared/utils/helpers";

const _Header: React.FC<Props> = ({
  topMenuItems,
  mobileMenuItems,
  isAuthenticated,
  profileHeader,
  backPath
}) => {
  const dispatch = useDispatch();
  const handlerLogout = useCallback(() => dispatch(logout), []);
  const [isOpen, setOpen, setClose] = useIsOpen();
  const [t] = useTranslation();
  return (
    <div className="header">
      <div className="header__left">
        <div className="navigation__menu" onClick={setOpen}>
          <Icon type="menu" />
        </div>
        <Navigation menuItems={topMenuItems} className="header__navigation" />
      </div>
      <div className="header__center">
        <div className="header__search">
          <Link
            to={{
              pathname: GLOBAL_SEARCH_ROUTE,
              state: backPath
            }}
          >
            <SearchIcon />
          </Link>
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
            <Link to={SIGNUP_ROUTE}>
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
  mobileMenuItems: TMenuItem[];
  topMenuItems: TMenuItem[];
  profileHeader?: ProfileHeaderViewModel;
  isAuthenticated: boolean;
  backPath: string;
}

const Header = React.memo(_Header);
export default Header;
