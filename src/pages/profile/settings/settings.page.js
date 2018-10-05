import "./settings.scss";

import Page from "components/page/page";
import TwoFactorAuthContainer from "modules/2fa/2fa-container";
import { PROFILE_ROUTE } from "pages/profile/profile/profile.page";
import React from "react";
import { translate } from "react-i18next";

import ProfileImageContainer from "./profile-image/profile-image-container";

export const SETTINGS_ROUTE = `${PROFILE_ROUTE}/settings`;

const SettingsPage = ({ t }) => {
  return (
    <Page title={t("settings.title")}>
      <h1>Settings</h1>
      <div className="profile-settings__content">
        <TwoFactorAuthContainer />
        <ProfileImageContainer />
      </div>
    </Page>
  );
};

SettingsPage.propTypes = {};

export default translate()(SettingsPage);
