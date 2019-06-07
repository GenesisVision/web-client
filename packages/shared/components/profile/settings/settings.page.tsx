import "./settings.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import GVButton from "shared/components/gv-button";
import ProfileLayout from "shared/components/profile/profile-layout";
import { PASSWORD_ROUTE } from "shared/components/profile/profile.constants";
import LogoutButtonContainer from "shared/components/profile/settings/logout-button/logout-button-container";
import ProfileImageContainer from "shared/components/profile/settings/profile-image/profile-image-container";
import TwoFactorAuthContainer from "shared/modules/2fa/2fa-container";

const _SettingsPage: React.FC<InjectedTranslateProps> = ({ t }) => (
  <ProfileLayout route="settings">
    <div className="profile-settings__content">
      <TwoFactorAuthContainer />
      <ProfileImageContainer />
      <div className="profile-settings__aside-actions">
        <Link
          to={{
            pathname: PASSWORD_ROUTE,
            state: `/ ${t("profile-page.title")}`
          }}
        >
          <GVButton
            variant="text"
            color="secondary"
            className={"profile-settings__password"}
          >
            <>
              {`${t("profile-page.settings.change-password")} `}
              <span className="profile-settings__password-arrow">&#8250;</span>
            </>
          </GVButton>
        </Link>
        <LogoutButtonContainer />
      </div>
    </div>
  </ProfileLayout>
);

const SettingsPage = translate()(React.memo(_SettingsPage));
export default SettingsPage;
