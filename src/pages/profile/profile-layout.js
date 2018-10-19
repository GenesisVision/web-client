import Page from "components/page/page";
import { GVTab, GVTabs } from "gv-react-components";
import { PROFILE_ROUTE, SETTINGS_ROUTE } from "pages/profile/profile.constants";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

const ProfileLayout = ({ route, children, t = string => string }) => {
  return (
    <Page title={t("profile.title")}>
      <h1>{t("profile.title")}</h1>
      <GVTabs value={route}>
        <GVTab
          label={
            <Link to={PROFILE_ROUTE}>{t("profile.tabs.personal-details")}</Link>
          }
          value="details"
        />
        <GVTab
          label={<Link to={SETTINGS_ROUTE}>{t("profile.tabs.settings")}</Link>}
          value="settings"
        />
      </GVTabs>
      {children}
    </Page>
  );
};

ProfileLayout.propTypes = {
  route: PropTypes.string
};

export default translate()(ProfileLayout);
