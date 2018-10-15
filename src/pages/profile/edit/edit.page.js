import Page from "components/page/page";
import ProfileForm from "modules/profile/profile-form";
import ProgramDetailsNavigation from "pages/programs/program-details/components/program-details-navigation/program-details-navigation";
import React from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

const ProfileEditPage = ({ t, service }) => {
  return (
    <Page title={t("profile.title")}>
      <ProgramDetailsNavigation goBack={service.goBack} />
      <ProfileForm info={{}} />
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
    mapDispatchToProps
  )
)(ProfileEditPage);
