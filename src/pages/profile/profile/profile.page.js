import Page from "components/page/page";
import { GVButton, GVTab, GVTabs } from "gv-react-components";
import Profile from "modules/profile/profile";
import ProfileContainer from "modules/profile/profile-container";
import { PROFILE_ROUTE, SETTINGS_ROUTE } from "pages/profile/profile.routes";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
const ProfilePage = ({ t }) => {
  return (
    <Page title={t("profile.title")}>
      <h1>{t("profile.title")}</h1>
      <GVTabs value="details">
        <GVTab
          label={<Link to={PROFILE_ROUTE}>Personal details</Link>}
          value="details"
        />
        <GVTab
          label={<Link to={SETTINGS_ROUTE}>Settings</Link>}
          value="settings"
        />
      </GVTabs>
      <ProfileContainer>
        <Profile />
      </ProfileContainer>
    </Page>
  );
};

ProfilePage.propTypes = {};

export default translate()(ProfilePage);
