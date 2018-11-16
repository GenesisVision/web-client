import "./settings.scss";

import { GVButton } from "gv-react-components";
import TwoFactorAuthContainer from "shared/modules/2fa/2fa-container";
import ProfileLayout from "shared/components/profile/profile-layout";
import { PASSWORD_ROUTE } from "shared/components/profile/profile.constants";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

import LogoutButtonContainer from "shared/components/profile/settings/logout-button/logout-button-container";
import ProfileImageContainer from "shared/components/profile/settings/profile-image/profile-image-container";
import * as profileSettingsService from "./services/profile-settings.service";

const SettingsPage = ({ t }) => {
  return (
    <ProfileLayout route="settings">
      <div className="profile-settings__content">
        <TwoFactorAuthContainer />
        <ProfileImageContainer
          profileSettingsService={profileSettingsService}
        />
        <div className="profile-settings__aside-actions">
          <Link
            to={{
              pathname: PASSWORD_ROUTE,
              state: `/ ${t("profile.title")}`
            }}
          >
            <GVButton
              variant="text"
              color="secondary"
              className={"profile-settings__password"}
            >
              {`${t("profile.settings.change-password")} `}
              <span className="profile-settings__password-arrow">&#8250;</span>
            </GVButton>
          </Link>

          <LogoutButtonContainer
            profileSettingsService={profileSettingsService}
          />
        </div>
      </div>
    </ProfileLayout>
  );
};

export default translate()(SettingsPage);
