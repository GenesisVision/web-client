import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { LogoutIcon } from "components/icon/logout-icon";
import { ToType } from "components/link/link";
import { useToLink } from "components/link/link.helper";
import NavigationItem, {
  NavigationButton
} from "components/navigation/navigation-item";
import Sidebar from "components/sidebar/sidebar";
import { ProfileHeaderViewModel } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { LOGIN_ROUTE } from "routes/app.routes";
import { TMenuItem } from "routes/menu";

import { MenuNavigationItem } from "../menu-navigation-item";

const _NavigationMobile: React.FC<Props> = ({
  mobileMenuItems,
  isAuthenticated,
  profileHeader,
  isOpenNavigation,
  onClose,
  logout,
  backPath
}) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  return (
    <Sidebar open={isOpenNavigation} onClose={onClose}>
      <div className="navigation__mobile mobile">
        {isAuthenticated && profileHeader && (
          <div className="mobile__header">
            <ProfileAvatar
              url={profileHeader.avatar}
              alt={profileHeader.email}
              className="mobile__avatar"
            />
            <div className="mobile__email">{profileHeader.email}</div>
          </div>
        )}
        <div className="mobile__top" onClick={onClose}>
          {mobileMenuItems.map(item => (
            <MenuNavigationItem item={item} key={item.label} />
          ))}
          {isAuthenticated ? (
            <NavigationButton icon={<LogoutIcon primary />} onClick={logout}>
              {t("navigation.logout")}
            </NavigationButton>
          ) : (
            <NavigationItem
              icon={<LogoutIcon primary rotate />}
              href={linkCreator(LOGIN_ROUTE, backPath)}
            >
              {t("navigation.login")}
            </NavigationItem>
          )}
        </div>
      </div>
    </Sidebar>
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
