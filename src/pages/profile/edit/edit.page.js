import Page from "components/page/page";
import { GVTab, GVTabs } from "gv-react-components";
import ProfileContainer from "modules/profile/profile-container";
import ProfileForm from "modules/profile/profile-form";
import { PROFILE_ROUTE, SETTINGS_ROUTE } from "pages/profile/profile.routes";
import ProgramDetailsNavigation from "pages/programs/program-details/components/program-details-navigation/program-details-navigation";
import React from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { Link } from "react-router-dom";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

const ProfileEditPage = ({ t, service }) => {
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
      <ProgramDetailsNavigation goBack={service.goBack} />
      <ProfileContainer>
        <ProfileForm />
      </ProfileContainer>
    </Page>
  );
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ goBack }, dispatch)
});

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps,
    null,
    { pure: false }
  )
)(ProfileEditPage);
