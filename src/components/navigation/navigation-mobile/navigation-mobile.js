import { DashboardIcon } from "components/icon/dashboard-icon";
import { DetailsIcon } from "components/icon/details-icon";
import { LogoutIcon } from "components/icon/logout-icon";
import { ProgramsIcon } from "components/icon/programs-icon";
import { SearchIcon } from "components/icon/search-icon";
import { SettingsIcon } from "components/icon/settings-icon";
import { WalletIcon } from "components/icon/wallet-icon";
import NavigationItem, {
  NavigationButton
} from "components/navigation/navigation-item";
import Sidebar from "components/sidebar/sidebar";
import { PROFILE_ROUTE } from "modules/profile/profile.constants";
import { WALLET_ROUTE } from "modules/wallet/wallet.constants";
import { LOGIN_ROUTE } from "pages/auth/login/login.routes";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import { GLOBAL_SEARCH_ROUTE } from "pages/global-search/global-search.routes";
import { PROGRAMS_ROUTE } from "pages/programs/programs.routes";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import UserIcon from "shared/media/user-avatar.svg";

const NavigationMobile = ({
  t,
  isAuthenticated,
  email,
  avatar,
  isOpenNavigation,
  onClose,
  logout
}) => {
  return (
    <Sidebar open={isOpenNavigation} onClose={onClose}>
      <div className="navigation__mobile mobile">
        {isAuthenticated && (
          <div className="mobile__header">
            <div className="mobile__avatar">
              <img
                alt={email}
                className="profile-widget__image"
                src={avatar || UserIcon}
              />
            </div>
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
          <NavigationItem
            icon={<SearchIcon primary />}
            href={GLOBAL_SEARCH_ROUTE}
          >
            {t("navigation.search")}
          </NavigationItem>
          <NavigationItem icon={<DetailsIcon primary />} href={PROFILE_ROUTE}>
            {t("navigation.personal-details")}
          </NavigationItem>
          <NavigationItem icon={<WalletIcon primary />} href={WALLET_ROUTE}>
            {t("navigation.wallet")}
          </NavigationItem>
          <NavigationItem icon={<SettingsIcon primary />} href={"/settings"}>
            {t("navigation.settings")}
          </NavigationItem>
          {isAuthenticated ? (
            <NavigationButton icon={<LogoutIcon primary />} onClick={logout}>
              {t("navigation.logout")}
            </NavigationButton>
          ) : (
            <NavigationItem
              icon={<LogoutIcon primary rotate />}
              href={LOGIN_ROUTE}
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
  isOpenNavigation: PropTypes.func,
  onClose: PropTypes.func,
  logout: PropTypes.func
};

export default translate()(NavigationMobile);
