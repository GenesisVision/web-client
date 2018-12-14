import "./header.scss";

import { Icon } from "shared/components/icon/icon";
import { SearchIcon } from "shared/components/icon/search-icon";
import Navigation from "shared/components/navigation/navigation";
import NavigationMobile from "shared/components/navigation/navigation-mobile/navigation-mobile";
import NorificationsWidget from "shared/components/notifications-widget/notifications-widget";
import ProfileWidget from "shared/components/profile-widget/profile-widget";
import WalletWidget from "shared/components/wallet-widget/wallet-widget";
import { GVButton } from "gv-react-components";
import CurrencySelectContainer from "shared/modules/currency-select/components/currency-select-container";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

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
      investedGvt,
      LOGIN_ROUTE,
      SIGNUP_ROUTE,
      GLOBAL_SEARCH_ROUTE
    } = this.props;
    return (
      <div className="header">
        <div className="header__left">
          <div className="navigation__menu profile-avatar">
            <Icon type={"menu"} onClick={this.handleOpenMenu} />
          </div>
          <Navigation className="header__navigation" />
        </div>
        <div className="header__center">
          <CurrencySelectContainer className="header__currency" />
          <div className="header__search">
            <Link to={GLOBAL_SEARCH_ROUTE}>
              <SearchIcon />
            </Link>
          </div>
        </div>
        <div className="header__separator" />
        <div className="header__right">
          {isAuthenticated ? (
            <Fragment>
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
              <ProfileWidget
                className="header__profile"
                logout={logout}
                avatar={avatar}
                email={email}
              />
            </Fragment>
          ) : (
            <div className="header__buttons">
              <Link to={LOGIN_ROUTE}>
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
          logout={logout}
          isOpenNavigation={this.state.isOpenNavigation}
          email={email}
          avatar={avatar}
          isAuthenticated={isAuthenticated}
          onClose={this.handleCloseMenu}
        />
      </div>
    );
  }
}

export default translate()(Header);
