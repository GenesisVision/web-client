import Page from "components/page/page";
import FundNotificationsContainer from "modules/fund-notifications/fund-notifications-container";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _FundNotificationPage: React.FC<Props> = ({ t, id }) => (
  <Page showTitle title={t("notifications-page.fund.title")}>
    <FundNotificationsContainer id={id} />
  </Page>
);

interface Props extends WithTranslation, OwnProps {}

interface OwnProps {
  id: string;
}

const FundNotificationPage = translate()(React.memo(_FundNotificationPage));
export default FundNotificationPage;
