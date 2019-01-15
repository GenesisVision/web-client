import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";
import ProgramNotificationsContainer from "shared/modules/program-notifications/program-notifications-container";

const ProgramNotificationPage = ({ t, match }) => {
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

export default translate()(ProgramNotificationPage);
