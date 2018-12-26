import "./header.scss";

import { GVButton } from "gv-react-components";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { Icon } from "shared/components/icon/icon";
import { SearchIcon } from "shared/components/icon/search-icon";
import Navigation from "shared/components/navigation/navigation";
import NavigationMobile from "shared/components/navigation/navigation-mobile/navigation-mobile";
import NorificationsWidget from "shared/components/notifications-widget/notifications-widget";
import ProfileWidget from "shared/components/profile-widget/profile-widget";
import WalletWidget from "shared/components/wallet-widget/wallet-widget";
import CurrencySelectContainer from "shared/modules/currency-select/components/currency-select-container";
import * as React from "react";
import { ProfileHeaderViewModel } from "gv-api-web";

interface IHeaderState {
  isOpenNavigation: boolean;
}

export interface IHeaderProps {
  profileHeader: ProfileHeaderViewModel;
  isAuthenticated: boolean;
  LOGIN_ROUTE: string;
  SIGNUP_ROUTE: string;
  GLOBAL_SEARCH_ROUTE: string;
  t(string: string): void;
  logout(): void;
  openNotifications(): void;
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
  static defaultProps = {
    profileHeader: {}
  };
  state = {
    isOpenNavigation: false
  };

  handleOpenMenu = () => this.setState({ isOpenNavigation: true });
  handleCloseMenu = () => this.setState({ isOpenNavigation: false });

  render(): React.ReactNode {
    const {
      t,
      logout,
      openNotifications,
      isAuthenticated,
      LOGIN_ROUTE,
      SIGNUP_ROUTE,
      GLOBAL_SEARCH_ROUTE,
      profileHeader
    } = this.props;

    const {
      avatar,
      email,
      totalBalanceGvt,
      availableGvt,
      investedGvt,
      notificationsCount
    } = profileHeader;

    return (
      <div className="header">
        <div className="header__left">
          <div
            className="navigation__menu profile-avatar"
            onClick={this.handleOpenMenu}
          >
            <Icon type={"menu"} />
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
            <React.Fragment>
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
            </React.Fragment>
          ) : (
            <div className="header__buttons">
              <Link
                to={{
                  pathname: LOGIN_ROUTE,
                  state: this.props.backPath
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
          backPath={this.props.backPath}
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
