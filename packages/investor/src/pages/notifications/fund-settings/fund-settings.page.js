import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";
import FundNotificationsContainer from "shared/modules/fund-notifications/fund-notifications-container";

const FundNotificationPage = ({ t, match }) => {
  const { id } = match.params;
  return (
    <Page title={t("notifications.fund.title")}>
      <h1 className="title-details">{t("notifications.fund.title")}</h1>
      <FundNotificationsContainer id={id} />
    </Page>
  );
};

export default translate()(FundNotificationPage);
