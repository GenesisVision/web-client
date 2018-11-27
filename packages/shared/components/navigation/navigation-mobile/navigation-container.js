import React, { PureComponent } from "react";
import { MenuIcon } from "shared/components/icon/icon";
import classnames from "classnames";
import NavigationMobile from "./navigation-mobile";

class NavigationContainer extends PureComponent {
  state = {
    isOpenNavigation: false
  };

  handleOpenMenu = () => this.setState({ isOpenNavigation: true });
  handleCloseMenu = () => this.setState({ isOpenNavigation: false });

  render() {
    const { logout, email, avatar, isAuthenticated } = this.props;
    return (
      <div
        onClick={this.handleOpenMenu}
        className={classnames("profile-avatar", this.props.className)}
      >
        <MenuIcon />
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

export default NavigationContainer;
