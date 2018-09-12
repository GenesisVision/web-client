import "./header.scss";

import classnames from "classnames";
import Chip from "components/chip/chip";
import { DashboardIcon } from "components/icon/dashboard-icon";
import { DetailsIcon } from "components/icon/details-icon";
import { MenuIcon } from "components/icon/icon";
import { LogoutIcon } from "components/icon/logout-icon";
import { ProgramsIcon } from "components/icon/programs-icon";
import { RingIcon } from "components/icon/ring-icon";
import { SearchIcon } from "components/icon/search-icon";
import { SettingsIcon } from "components/icon/settings-icon";
import { WalletIcon } from "components/icon/wallet-icon";
import Navigation from "components/navigation/navigation";
import NavigationItem, {
  NavigationButton
} from "components/navigation/navigation-item";
import NorificationsWidget from "components/notifications-widget/notifications-widget";
import ProfileWidget from "components/profile-widget/profile-widget";
import Sidebar from "components/sidebar/sidebar";
import WalletWidget from "components/wallet-widget/wallet-widget";
import { GVButton } from "gv-react-components";
import AuthorizationControlsContainer from "modules/authorization-controls/authorization-controls";
import CurrencySelectContainer from "modules/currency-select/components/currency-select-container";
import { PROFILE_ROUTE } from "modules/profile/profile.constants";
import { WALLET_ROUTE } from "modules/wallet/wallet.constants";
import { LOGIN_ROUTE } from "pages/auth/login/login.routes";
import { SIGNUP_ROUTE } from "pages/auth/signup/signup.routes";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import { PROGRAMS_ROUTE } from "pages/programs/programs.routes";
// import ProfileHeaderContainer from "modules/profile-header/components/profile-header-container";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import UserIcon from "shared/media/user-avatar.svg";

class Header extends Component {
  state = {
    isOpenNavigation: false
  };

  handleOpenMenu = () => this.setState({ isOpenNavigation: true });
  handleCloseMenu = () => this.setState({ isOpenNavigation: false });

  render() {
    const {
      t,
      avatar,
      logout,
      email,
      openNotifications,
      notificationsCount,
      isAuthenticated,
      totalBalanceGvt,
      availableGvt,
      investedGvt
    } = this.props;
    // return (<h1>Hello World</h1>);
    const hasNotifications = notificationsCount > 0;
    return (
      <div className="header">
        <div className="header__left">
          <GVButton
            onClick={this.handleOpenMenu}
            variant="text"
            color="secondary"
            className="navigation__menu"
          >
            <MenuIcon />
          </GVButton>
          <Navigation className="header__navigation" />
        </div>
        <div className="header__center">
          <CurrencySelectContainer className="header__currency" />
          <div className="header__search">
            <Link to="/search">
              <SearchIcon />
            </Link>
          </div>
        </div>
        <div className="header__separator" />
        {isAuthenticated && (
          <div className="header__right">
            <WalletWidget
              className="header__wallet"
              totalBalanceGvt={totalBalanceGvt}
              investedGvt={investedGvt}
              availableGvt={availableGvt}
            />
            <NorificationsWidget
              notificationsCount={notificationsCount}
              openNotifications={openNotifications}
            />

            {/*<div className="header__buttons">*/}
            {/*<Link to={LOGIN_ROUTE}>*/}
            {/*<GVButton variant="outlined" color="secondary">*/}
            {/*{t("auth.login.title")}*/}
            {/*</GVButton>*/}
            {/*</Link>*/}
            {/*<Link to={SIGNUP_ROUTE}>*/}
            {/*<GVButton variant="contained" color="primary">*/}
            {/*{t("auth.signup.title")}*/}
            {/*</GVButton>*/}
            {/*</Link>*/}
            {/*</div>*/}
            <ProfileWidget
              className="header__profile"
              logout={logout}
              avatar={avatar}
              email={email}
            />
          </div>
        )}

        <Sidebar
          open={this.state.isOpenNavigation}
          onClose={this.handleCloseMenu}
        >
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
            <div className="mobile__top" onClick={this.handleCloseMenu}>
              <NavigationItem
                icon={<DashboardIcon primary />}
                href={DASHBOARD_ROUTE}
              >
                {t("navigation.Dashboard")}
              </NavigationItem>
              <NavigationItem
                icon={<ProgramsIcon primary />}
                href={PROGRAMS_ROUTE}
              >
                {t("navigation.Programs")}
              </NavigationItem>
              <NavigationItem icon={<SearchIcon primary />} href={"/search"}>
                {t("Search")}
              </NavigationItem>
              <NavigationItem
                icon={<DetailsIcon primary />}
                href={PROFILE_ROUTE}
              >
                {t("profile-widget.personal-details")}
              </NavigationItem>
              <NavigationItem icon={<WalletIcon primary />} href={WALLET_ROUTE}>
                {t("Wallet")}
              </NavigationItem>
              <NavigationItem
                icon={<SettingsIcon primary />}
                href={"/settings"}
              >
                {t("profile-widget.settings")}
              </NavigationItem>
              {isAuthenticated ? (
                <NavigationButton
                  icon={<LogoutIcon primary />}
                  onClick={logout}
                >
                  {t("profile-widget.logout")}
                </NavigationButton>
              ) : (
                <NavigationItem
                  icon={<LogoutIcon primary rotate />}
                  href={LOGIN_ROUTE}
                >
                  {t("login")}
                </NavigationItem>
              )}
            </div>
          </div>
        </Sidebar>
      </div>
    );
  }
}

export default translate()(Header);
