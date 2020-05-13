import NotificationsWidget from "components/notifications-widget/notifications-widget";
import ProfileWidget from "components/profile-widget/profile-widget";
import { ProfileWidgetLoader } from "components/profile-widget/profile-widget.loader";
import WalletWidgetContainer from "components/wallet-widget/wallet-widget-container";
import { ProfileHeaderViewModel } from "gv-api-web";
import React from "react";
import { getRandomInteger } from "utils/helpers";

import styles from "./header.module.scss";

const AuthWidgets: React.FC<Props> = ({ profileHeader }) => {
  return (
    <>
      <div className={styles["header__wallet"]}>
        <WalletWidgetContainer />
      </div>
      <NotificationsWidget
        loaderData={getRandomInteger(0, 1000)}
        data={profileHeader && profileHeader.notificationsCount}
      />
      <ProfileWidget
        condition={!!profileHeader}
        loader={<ProfileWidgetLoader className={styles["header__profile"]} />}
        profileHeader={profileHeader!}
        className={styles["header__profile"]}
      />
    </>
  );
};

interface Props {
  profileHeader?: ProfileHeaderViewModel;
}

export default AuthWidgets;
