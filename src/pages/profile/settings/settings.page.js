import Page from "components/page/page";
import { PROFILE_ROUTE } from "pages/profile/profile/profile.page";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";

export const SETTINGS_ROUTE = `${PROFILE_ROUTE}/settings`;

const SettingsPage = ({ t }) => {
  return (
    <Page title={t("settings.title")}>
      <h1>Settings</h1>
    </Page>
  );
};

SettingsPage.propTypes = {};

export default translate()(SettingsPage);
