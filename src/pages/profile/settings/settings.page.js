import "./settings.scss";

import Page from "components/page/page";
import { GVButton } from "gv-react-components";
import TwoFactorAuthContainer from "modules/2fa/2fa-container";
import { PASSWORD_ROUTE } from "pages/profile/password/password.page";
import { PROFILE_ROUTE } from "pages/profile/profile/profile.page";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

import LogoutButtonContainer from "./logout-button/logout-button-container";
import ProfileImageContainer from "./profile-image/profile-image-container";

export const SETTINGS_ROUTE = `${PROFILE_ROUTE}/settings`;

const SettingsPage = ({ t }) => {
  return (
    <Page title={t("settings.title")}>
      <h1>{t("profile.settings.title")}</h1>
      <div className="profile-settings__content">
        <TwoFactorAuthContainer />
        <ProfileImageContainer />
        <div className="profile-settings__aside-actions">
          <Link to={PASSWORD_ROUTE}>
            <GVButton
              variant="text"
              color="secondary"
              className={"profile-settings__password"}
            >
              {`${t("settings.change-password")} >`}
            </GVButton>
          </Link>

          <LogoutButtonContainer />
        </div>
      </div>
    </Page>
  );
};

SettingsPage.propTypes = {};

export default translate()(SettingsPage);
