import Page from "components/page/page";
import FundNotificationsContainer from "modules/fund-notifications/fund-notifications-container";
import React from "react";
import { translate } from "react-i18next";
import BackButton from "components/back-button/back-button";

const FundNotificationPage = ({ t, match }) => {
  const { id } = match.params;
  return (
    <Page title={t("notifications.fund.title")}>
      <BackButton />
      <h1>{t("notifications.fund.title")}</h1>
      <FundNotificationsContainer id={id} />
    </Page>
  );
};

export default translate()(FundNotificationPage);
