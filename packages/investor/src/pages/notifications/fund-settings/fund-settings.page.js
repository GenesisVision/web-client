import Page from "shared/components/page/page";
import FundNotificationsContainer from "shared/modules/fund-notifications/fund-notifications-container";
import React from "react";
import { translate } from "react-i18next";

const FundNotificationPage = ({ t, match }) => {
  const { id } = match.params;
  return (
    <Page title={t("notifications.fund.title")}>
      <h1>{t("notifications.fund.title")}</h1>
      <FundNotificationsContainer id={id} />
    </Page>
  );
};

export default translate()(FundNotificationPage);
