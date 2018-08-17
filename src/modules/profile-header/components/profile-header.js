import "./profile-header.scss";

import classnames from "classnames";
import { RingIcon } from "components/icon/icon";
import ProfileWidget from "components/profile-widget/profile-widget";
import Sidebar from "components/sidebar/sidebar";
import WalletWidget from "components/wallet-widget/wallet-widget";
import PropTypes from "prop-types";
import React from "react";

class ProfileHeader extends React.Component {
  state = {
    isOpenSidebar: true
  };
  openSidebar = () => {
    this.setState({ isOpenSidebar: true });
  };
  closeSidebar = () => {
    this.setState({ isOpenSidebar: false });
  };
  render() {
    const {
      availableGvt,
      investedGvt,
      totalBalanceGvt,
      notificationsAmount,
      avatar,
      logout,
      email
    } = this.props;
    const hasNotifications = notificationsAmount > 0;
    return (
      <div className="profile-header">
        <WalletWidget
          availableGvt={availableGvt}
          investedGvt={investedGvt}
          totalBalanceGvt={totalBalanceGvt}
        />
        <button className="profile-header__add profile-header__label">+</button>
        <div
          onClick={this.openSidebar}
          className={classnames("notifications-widget", {
            "notifications-widget--has": hasNotifications
          })}
        >
          <RingIcon />
          <span className="notifications-widget__count profile-header__label">
            {notificationsAmount}
          </span>
        </div>
        <ProfileWidget avatar={avatar} logout={logout} email={email} />
        <Sidebar open={this.state.isOpenSidebar} onClose={this.closeSidebar} />
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  availableGvt: PropTypes.number,
  avatar: PropTypes.string,
  favoritesCount: PropTypes.number,
  id: PropTypes.string,
  investedGvt: PropTypes.number,
  email: PropTypes.string,
  notificationsAmount: PropTypes.number,
  totalBalanceGvt: PropTypes.number,
  logout: PropTypes.func.isRequired
};

export default ProfileHeader;
