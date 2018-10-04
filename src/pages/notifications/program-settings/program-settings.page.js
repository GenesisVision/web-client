import Page from "components/page/page";
import React from "react";
import { translate } from "react-i18next";

const ProgramNotificationPage = ({ t, match }) => {
  const { id } = match.params;
  return (
    <Page title={t("notifications.program.title")}>
      <h1>{t("notifications.program.title")}</h1>
      <p>{id}</p>
    </Page>
  );
};

ProgramNotificationPage.propTypes = {};

export default translate()(ProgramNotificationPage);
