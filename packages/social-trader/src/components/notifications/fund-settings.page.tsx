import Page from "components/page/page";
import FundNotificationsContainer from "modules/fund-notifications/fund-notifications-container";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _FundNotificationPage: React.FC<Props> = ({ t, id }) => (
  <Page title={t("notifications-page.program.title")}>
    <div className="app__main-wrapper">
      <h1 className="title-small-padding">
        {t("notifications-page.fund.title")}
      </h1>
      <FundNotificationsContainer id={id} />
    </div>
  </Page>
);

interface Props extends WithTranslation, OwnProps {}

interface OwnProps {
  id: string;
}

const FundNotificationPage = translate()(React.memo(_FundNotificationPage));
export default FundNotificationPage;
