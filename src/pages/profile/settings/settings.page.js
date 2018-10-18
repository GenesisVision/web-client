import "./settings.scss";

import Page from "components/page/page";
import { GVButton, GVTab, GVTabs } from "gv-react-components";
import TwoFactorAuthContainer from "modules/2fa/2fa-container";
import {
  PASSWORD_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE
} from "pages/profile/profile.routes";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

import LogoutButtonContainer from "./logout-button/logout-button-container";
import ProfileImageContainer from "./profile-image/profile-image-container";

const SettingsPage = ({ t }) => {
  return (
    <Page title={t("profile.settings.title")}>
      <h1>{t("profile.title")}</h1>
      <GVTabs value="settings">
        <GVTab
          label={<Link to={PROFILE_ROUTE}>Personal details</Link>}
          value="details"
        />
        <GVTab
          label={<Link to={SETTINGS_ROUTE}>Settings</Link>}
          value="settings"
        />
      </GVTabs>
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
              {`${t("profile.settings.change-password")} >`}
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
