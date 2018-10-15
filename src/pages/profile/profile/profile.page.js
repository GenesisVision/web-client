import Page from "components/page/page";
import { GVButton } from "gv-react-components";
import ProfileContainer from "modules/profile/profile-container";
import { PROFILE_EDIT_ROUTE } from "pages/profile/profile.routes";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

const ProfilePage = ({ t }) => {
  return (
    <Page title={t("profile.title")}>
      <ProfileContainer />
      <Link to={PROFILE_EDIT_ROUTE}>
        <GVButton>Edit</GVButton>
      </Link>
    </Page>
  );
};

ProfilePage.propTypes = {};

export default translate()(ProfilePage);
