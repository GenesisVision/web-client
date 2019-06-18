import "./header.scss";

import { ProfileHeaderViewModel } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "shared/components/auth/login/login.routes";
import { SIGNUP_ROUTE } from "shared/components/auth/signup/signup.routes";
import { GLOBAL_SEARCH_ROUTE } from "shared/components/global-search/global-search.routes";
import GVButton from "shared/components/gv-button";
import { Icon } from "shared/components/icon/icon";
import { SearchIcon } from "shared/components/icon/search-icon";
import Navigation from "shared/components/navigation/navigation";
import NavigationMobile from "shared/components/navigation/navigation-mobile/navigation-mobile";
import NotificationsWidget from "shared/components/notifications-widget/notifications-widget";
import { NotificationsWidgetLoader } from "shared/components/notifications-widget/notifications-widget.loader";
import ProfileWidget from "shared/components/profile-widget/profile-widget";
import { ProfileWidgetLoader } from "shared/components/profile-widget/profile-widget.loader";
import WalletWidgetContainer from "shared/components/wallet-widget/wallet-widget-container";
import CurrencySelectContainer from "shared/modules/currency-select/components/currency-select-container";

class _Header extends React.PureComponent<Props, State> {
  state = {
    isOpenNavigation: false
  };

  handleOpenMenu = () => this.setState({ isOpenNavigation: true });
  handleCloseMenu = () => this.setState({ isOpenNavigation: false });

  render() {
    const {
      t,
      logout,
      openNotifications,
      isAuthenticated,
      profileHeader
    } = this.props;
    return (
      <div className="header">
        <div className="header__left">
          <div
            className="navigation__menu profile-avatar"
            onClick={this.handleOpenMenu}
          >
            <Icon type="menu" />
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
            <>
              <WalletWidgetContainer className="header__wallet" />
              <NotificationsWidget
                condition={!!profileHeader}
                loader={<NotificationsWidgetLoader />}
                notificationsCount={
                  profileHeader ? profileHeader.notificationsCount : 0
                }
                openNotifications={openNotifications}
              />
              <ProfileWidget
                condition={!!profileHeader}
                loader={<ProfileWidgetLoader className="header__profile" />}
                profileHeader={profileHeader!}
                className="header__profile"
                logout={logout}
              />
            </>
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
          profileHeader={profileHeader}
          isAuthenticated={isAuthenticated}
          onClose={this.handleCloseMenu}
        />
      </div>
    );
  }
}

interface State {
  isOpenNavigation: boolean;
}

export interface Props extends InjectedTranslateProps {
  profileHeader?: ProfileHeaderViewModel;
  isAuthenticated: boolean;
  backPath: string;
  logout: () => void;
  openNotifications: () => void;
}

const Header = translate()(React.memo(_Header));
export default Header;
