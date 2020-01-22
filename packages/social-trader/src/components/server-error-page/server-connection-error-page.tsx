import Page from "components/page/page";
import React from "react";
import { useTranslation } from "react-i18next";

const ServerConnectionErrorPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page showTitle title={t("server-connection-error-page.title")}>
      {t("server-connection-error-page.body")}
    </Page>
  );
};

export default ServerConnectionErrorPage;
