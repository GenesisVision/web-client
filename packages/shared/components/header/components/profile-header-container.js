import { Component, Fragment } from "react";
import WalletWidget from "shared/components/wallet-widget/wallet-widget";
import NorificationsWidget from "shared/components/notifications-widget/notifications-widget";
import ProfileWidget from "shared/components/profile-widget/profile-widget";
import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import React from "react";
import { connect } from "react-redux";

const FETCH_TIMER = 1000 * 60 * 2;

class ProfileHeader extends Component {
  componentDidMount() {
    this.setFetchInterval();
  }

  componentWillUnmount() {
    this.clearFetchInterval();
  }

  setFetchInterval = () => {
    this.props.fetchProfileHeaderInfo();
    this.interval = setInterval(() => {
      this.props.fetchProfileHeaderInfo();
    }, FETCH_TIMER);
  };

  clearFetchInterval = () => {
    if (!this.interval) return;
    clearInterval(this.interval);
  };

  render() {
    const { info, logout, openNotifications } = this.props;
    const {
      avatar,
      notificationsCount,
      email,
      totalBalanceGvt,
      availableGvt,
      investedGvt
    } = info.data ? info.data : {};

    return (
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
    );
  }
}

const mapDispatchToProps = {
  fetchProfileHeaderInfo
};

const mapStateToProps = state => ({ ...state.profileHeader });

const ProfileHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(ProfileHeader);

export default ProfileHeaderContainer;
