import { ProfileHeaderViewModel } from "gv-api-web";
import * as React from "react";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import { DashboardIcon } from "shared/components/icon/dashboard-icon";
import { DetailsIcon } from "shared/components/icon/details-icon";
import { FundsIcon } from "shared/components/icon/funds-icon";
import { LogoutIcon } from "shared/components/icon/logout-icon";
import { ProgramsIcon } from "shared/components/icon/programs-icon";
import { SettingsIcon } from "shared/components/icon/settings-icon";
import { WalletIcon } from "shared/components/icon/wallet-icon";
import NavigationItem, {
  NavigationButton
} from "shared/components/navigation/navigation-item";
import {
  PROFILE_ROUTE,
  SETTINGS_ROUTE
} from "shared/components/profile/profile.constants";
import Sidebar from "shared/components/sidebar/sidebar";
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";
import { WithTranslation, withTranslation } from "shared/i18n";
import { LOGIN_ROUTE } from "shared/routes/app.routes";
import { DASHBOARD_ROUTE } from "shared/routes/dashboard.routes";
import { FUNDS_ROUTE } from "shared/routes/funds.routes";
import { PROGRAMS_ROUTE } from "shared/routes/programs.routes";

const _NavigationMobile: React.FC<Props> = ({
  t,
  isAuthenticated,
  profileHeader,
  isOpenNavigation,
  onClose,
  logout,
  backPath
}) => (
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
        <NavigationItem
          icon={<DashboardIcon primary />}
          pathname={DASHBOARD_ROUTE}
        >
          {t("navigation.dashboard")}
        </NavigationItem>
        <NavigationItem
          icon={<ProgramsIcon primary />}
          pathname={PROGRAMS_ROUTE}
        >
          {t("navigation.programs")}
        </NavigationItem>
        <NavigationItem icon={<FundsIcon primary />} pathname={FUNDS_ROUTE}>
          {t("navigation.funds")}
        </NavigationItem>
        <NavigationItem
          exact
          icon={<DetailsIcon primary />}
          pathname={PROFILE_ROUTE}
        >
          {t("navigation.personal-details")}
        </NavigationItem>
        <NavigationItem
          icon={<WalletIcon primary />}
          pathname={WALLET_TOTAL_PAGE_ROUTE}
        >
          {t("navigation.wallet")}
        </NavigationItem>
        <NavigationItem
          icon={<SettingsIcon primary />}
          pathname={SETTINGS_ROUTE}
        >
          {t("navigation.settings")}
        </NavigationItem>
        {isAuthenticated ? (
          <NavigationButton icon={<LogoutIcon primary />} onClick={logout}>
            {t("navigation.logout")}
          </NavigationButton>
        ) : (
          <NavigationItem
            icon={<LogoutIcon primary rotate />}
            pathname={LOGIN_ROUTE}
            state={backPath}
          >
            {t("navigation.login")}
          </NavigationItem>
        )}
      </div>
    </div>
  </Sidebar>
);

interface Props extends WithTranslation {
  backPath: string;
  isAuthenticated: boolean;
  profileHeader?: ProfileHeaderViewModel;
  isOpenNavigation: boolean;
  onClose(): void;
  logout(): void;
}

const NavigationMobile = withTranslation()(React.memo(_NavigationMobile));
export default NavigationMobile;
