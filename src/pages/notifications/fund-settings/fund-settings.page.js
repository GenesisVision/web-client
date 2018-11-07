import Page from "components/page/page";
import FundNotificationsContainer from "modules/fund-notifications/fund-notifications-container";
import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";
import BackButton from "components/back-button/back-button";

const FundNotificationPage = ({ t, match, service, backPath }) => {
  const { id } = match.params;
  return (
    <Page title={t("notifications.fund.title")}>
      <BackButton backPath={backPath} goBack={service.goBack} />
      <h1>{t("notifications.fund.title")}</h1>
      <FundNotificationsContainer id={id} />
    </Page>
  );
};

const mapStateToProps = state => ({
  backPath: state.routing.location.state
});

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ goBack }, dispatch)
});

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FundNotificationPage);
