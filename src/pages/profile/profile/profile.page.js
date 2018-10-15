import Page from "components/page/page";
import { GVButton } from "gv-react-components";
import Profile from "modules/profile/profile";
import ProfileContainer from "modules/profile/profile-container";
import { PROFILE_EDIT_ROUTE } from "pages/profile/profile.routes";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

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
