import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import Page from "shared/components/page/page";
import ProgramNotificationsContainer from "shared/modules/program-notifications/program-notifications-container";

const _ProgramNotificationPage: React.FC<Props> = ({ t, id }) => (
  <Page title={t("notifications-page.program.title")}>
    <div className="app__main-wrapper">
      <h1 className="title-small-padding">
        {t("notifications-page.program.title")}
      </h1>
      <ProgramNotificationsContainer id={id} />
    </div>
  </Page>
);

interface Props extends WithTranslation, OwnProps {}

interface OwnProps {
  id: string;
}

const ProgramNotificationPage = translate()(
  React.memo(_ProgramNotificationPage)
);
export default ProgramNotificationPage;
