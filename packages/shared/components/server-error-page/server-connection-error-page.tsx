import React from "react";
import { useTranslation } from "react-i18next";
import Page from "shared/components/page/page";

const ServerConnectionErrorPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page title={t("server-connection-error-page.title")}>
      <div className="app__main-wrapper">
        {t("server-connection-error-page.body")}
      </div>
    </Page>
  );
};

export default ServerConnectionErrorPage;
