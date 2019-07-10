import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { RouteComponentProps } from "react-router";
import Page from "shared/components/page/page";
import FundNotificationsContainer from "shared/modules/fund-notifications/fund-notifications-container";

const _FundNotificationPage: React.FC<Props> = ({ t, match }) => {
  const { id } = match.params;
  return (
    <Page title={t("notifications-page.program.title")}>
      <div className="app__main-wrapper">
        <h1 className="title-small-padding">
          {t("notifications-page.program.title")}
        </h1>
        <FundNotificationsContainer id={id} />
      </div>
    </Page>
  );
};

interface Props extends RouteComponentProps<Params>, WithTranslation {}

interface Params {
  id: string;
}

const FundNotificationPage = translate()(React.memo(_FundNotificationPage));
export default FundNotificationPage;
