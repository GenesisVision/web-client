import "./profile-header.scss";

import Avatar from "components/avatar/avatar";
import NotificationWidget from "components/notifications-widget/notification-widget";
import WalletWidget from "components/wallet-widget/wallet-widget";
import React from "react";
// import logo from "shared/media/logo.svg";

const ProfileHeader = () => {
  return (
    <div className={"profile-header"}>
      <WalletWidget />
      <NotificationWidget className={"profile-header__notifications"}/>
      <Avatar url={"https://picsum.photos/200/200"} />
    </div>
  );
};

export default ProfileHeader;
