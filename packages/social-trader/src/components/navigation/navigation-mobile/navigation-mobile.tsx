import clsx from "clsx";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { LogoutIcon } from "components/icon/logout-icon";
import NavigationItem from "components/navigation/navigation-item";
import { ProfileHeaderViewModel } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { LOGIN_ROUTE } from "routes/app.routes";
import { TMenuItem } from "routes/menu";

import { MenuNavigationItem } from "../menu-navigation-item";
import styles from "../navigation.module.scss";

const _NavigationMobile: React.FC<Props> = ({
  onClose,
  isAuthenticated,
  profileHeader,
  mobileMenuItems,
  logout,
  backPath
}) => {
  const [t] = useTranslation();
  return (
    <div className={clsx(styles["navigation__mobile"], styles["mobile"])}>
      {isAuthenticated && profileHeader && (
        <div className={styles["mobile__header"]}>
          <ProfileAvatar
            url={profileHeader.logoUrl}
            alt={profileHeader.email}
            className={styles["mobile__avatar"]}
          />
          <div className={styles["mobile__email"]}>{profileHeader.email}</div>
        </div>
      )}
      <div className={styles["mobile__top"]} onClick={onClose}>
        {mobileMenuItems.map(item => (
          <MenuNavigationItem item={item} key={item.label} />
        ))}
        {isAuthenticated ? (
          <NavigationItem icon={<LogoutIcon primary />} onClick={logout}>
            {t("navigation.logout")}
          </NavigationItem>
        ) : (
          <NavigationItem
            icon={<LogoutIcon primary rotate />}
            href={{
              pathname: LOGIN_ROUTE,
              state: backPath
            }}
          >
            {t("navigation.login")}
          </NavigationItem>
        )}
      </div>
    </div>
  );
};

interface Props {
  mobileMenuItems: TMenuItem[];
  backPath: string;
  isAuthenticated: boolean;
  profileHeader?: ProfileHeaderViewModel;
  isOpenNavigation: boolean;
  onClose: () => void;
  logout: () => void;
}

const NavigationMobile = React.memo(_NavigationMobile);
export default NavigationMobile;
