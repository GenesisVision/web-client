import Page from "components/page/page";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";

export const PROFILE_ROUTE = "/profile";

const ProfilePage = ({ t }) => {
  return <Page title={t("profile.title")} />;
};

ProfilePage.propTypes = {};

export default translate()(ProfilePage);
