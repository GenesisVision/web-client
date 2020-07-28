import Page from "components/page/page";
import FundNotificationsContainer from "modules/fund-notifications/fund-notifications-container";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  id: string;
}

const _FundNotificationPage: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  return (
    <Page showTitle title={t("notifications-page:fund.title")}>
      <FundNotificationsContainer id={id} />
    </Page>
  );
};

const FundNotificationPage = React.memo(_FundNotificationPage);
export default FundNotificationPage;
