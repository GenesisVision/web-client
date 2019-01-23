import { LOGIN_ROUTE } from "pages/auth/login/login.routes";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import { FUNDS_ROUTE } from "pages/funds/funds.routes";
import { PROGRAMS_ROUTE } from "pages/programs/programs.routes";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import { GLOBAL_SEARCH_ROUTE } from "shared/components/global-search/global-search.routes";
import { DashboardIcon } from "shared/components/icon/dashboard-icon";
import { DetailsIcon } from "shared/components/icon/details-icon";
import { FundsIcon } from "shared/components/icon/funds-icon";
import { LogoutIcon } from "shared/components/icon/logout-icon";
import { ProgramsIcon } from "shared/components/icon/programs-icon";
import { SearchIcon } from "shared/components/icon/search-icon";
import { SettingsIcon } from "shared/components/icon/settings-icon";
import { WalletIcon } from "shared/components/icon/wallet-icon";
import NavigationItem, {
  NavigationButton
} from "shared/components/navigation/navigation-item";
import {
  PROFILE_ROUTE,
  SETTINGS_ROUTE
} from "shared/components/profile/profile.constants";
import Sidebar from "shared/components/sidebar/sidebar";
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet-total-page";

const NavigationMobile = ({
  t,
  isAuthenticated,
  email,
  avatar,
  isOpenNavigation,
  onClose,
  logout,
  backPath
}) => {
  return (
    <Sidebar open={isOpenNavigation} onClose={onClose}>
      <div className="navigation__mobile mobile">
        {isAuthenticated && (
          <div className="mobile__header">
            <ProfileAvatar
              url={avatar}
              alt={email}
              className="mobile__avatar"
              imageClassName="profile-widget__image"
            />
            <div className="mobile__email">{email}</div>
          </div>
        )}
        <div className="mobile__top" onClick={onClose}>
          <NavigationItem
            icon={<DashboardIcon primary />}
            href={DASHBOARD_ROUTE}
          >
            {t("navigation.dashboard")}
          </NavigationItem>
          <NavigationItem icon={<ProgramsIcon primary />} href={PROGRAMS_ROUTE}>
            {t("navigation.programs")}
          </NavigationItem>
          <NavigationItem icon={<FundsIcon primary />} href={FUNDS_ROUTE}>
            {t("navigation.funds")}
          </NavigationItem>
          <NavigationItem
            icon={<SearchIcon primary />}
            href={GLOBAL_SEARCH_ROUTE}
          >
            {t("navigation.search")}
          </NavigationItem>
          <NavigationItem
            exact
            icon={<DetailsIcon primary />}
            href={PROFILE_ROUTE}
          >
            {t("navigation.personal-details")}
          </NavigationItem>
          <NavigationItem
            icon={<WalletIcon primary />}
            href={WALLET_TOTAL_PAGE_ROUTE}
          >
            {t("navigation.wallet")}
          </NavigationItem>
          <NavigationItem icon={<SettingsIcon primary />} href={SETTINGS_ROUTE}>
            {t("navigation.settings")}
          </NavigationItem>
          {isAuthenticated ? (
            <NavigationButton icon={<LogoutIcon primary />} onClick={logout}>
              {t("navigation.logout")}
            </NavigationButton>
          ) : (
            <NavigationItem
              icon={<LogoutIcon primary rotate />}
              href={{ pathname: LOGIN_ROUTE, state: backPath }}
            >
              {t("navigation.login")}
            </NavigationItem>
          )}
        </div>
      </div>
    </Sidebar>
  );
};

NavigationMobile.propTypes = {
  isAuthenticated: PropTypes.bool,
  email: PropTypes.string,
  avatar: PropTypes.string,
  isOpenNavigation: PropTypes.bool,
  onClose: PropTypes.func,
  logout: PropTypes.func
};

export default translate()(NavigationMobile);
