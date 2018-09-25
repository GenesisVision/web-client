import { PROFILE_ROUTE } from "pages/profile/profile/profile.page";
import PropTypes from "prop-types";
import React from "react";

export const SETTINGS_ROUTE = `${PROFILE_ROUTE}/settings`;

const SettingsPage = props => {
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

SettingsPage.propTypes = {};

export default SettingsPage;
