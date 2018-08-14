import "./profile-header.scss";

import NotificationWidget from "components/notifications-widget/notification-widget";
import WalletWidget from "components/wallet-widget/wallet-widget";
import ProfileWidget from "modules/profile-widget/components/profile-widget";
import React from "react";

const ProfileHeader = props => {
  return (
    <div className={"profile-header"}>
      <WalletWidget {...props.info} />
      <NotificationWidget
        notificationsAmount={props.info.notificationsAmount}
        className={"profile-header__notifications"}
      />
      <ProfileWidget avatar={props.info.avatar} />
    </div>
  );
};

export default ProfileHeader;
