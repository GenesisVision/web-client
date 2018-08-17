import "./profile-header.scss";

import classnames from "classnames";
import { RingIcon } from "components/icon/icon";
import ProfileWidget from "components/profile-widget/profile-widget";
import Tag from "components/tag/tag";
import WalletWidget from "components/wallet-widget/wallet-widget";
import PropTypes from "prop-types";
import React from "react";

class ProfileHeader extends React.Component {
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
        <Tag type="success">+</Tag>
        <div
          className={classnames("notifications-widget", {
            "notifications-widget--has": hasNotifications
          })}
        >
          <RingIcon />
          <Tag type={hasNotifications ? "danger" : null}>
            {notificationsAmount}
          </Tag>
        </div>
        <ProfileWidget avatar={avatar} logout={logout} email={email} />
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
