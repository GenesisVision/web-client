import Page from "components/page/page";
import ProfileContainer from "modules/profile/profile-container";
import React from "react";
import { translate } from "react-i18next";

export const PROFILE_ROUTE = "/profile";

const ProfilePage = ({ t }) => {
  return (
    <Page title={t("profile.title")}>
      <ProfileContainer />
    </Page>
  );
};

ProfilePage.propTypes = {};

export default translate()(ProfilePage);
