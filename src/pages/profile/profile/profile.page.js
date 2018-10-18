import Page from "components/page/page";
import Profile from "modules/profile/profile";
import ProfileContainer from "modules/profile/profile-container";
import React from "react";
import { translate } from "react-i18next";

const ProfilePage = ({ t }) => {
  return (
    <Page title={t("profile.title")}>
      <ProfileContainer>
        <Profile />
      </ProfileContainer>
    </Page>
  );
};

ProfilePage.propTypes = {};

export default translate()(ProfilePage);
