import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { RouteComponentProps } from "react-router";
import Page from "shared/components/page/page";
import ProgramNotificationsContainer from "shared/modules/program-notifications/program-notifications-container";

const _ProgramNotificationPage: React.FC<Props> = ({ t, match }) => {
  const { id } = match.params;
  return (
    <Page title={t("notifications-page.program.title")}>
      <div className="app__main-wrapper">
        <h1 className="title-small-padding">
          {t("notifications-page.program.title")}
        </h1>
        <ProgramNotificationsContainer id={id} />
      </div>
    </Page>
  );
};

interface Props extends RouteComponentProps<Params>, WithTranslation {}

interface Params {
  id: string;
}

const ProgramNotificationPage = React.memo(
  translate()(_ProgramNotificationPage)
);
export default ProgramNotificationPage;
