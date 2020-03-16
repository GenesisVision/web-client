import Page from "components/page/page";
import React from "react";
import { useTranslation } from "react-i18next";

const ServerConnectionErrorPage: React.FC<Props> = ({ message }) => {
  const [t] = useTranslation();
  return (
    <Page showTitle title={t("server-connection-error-page.title")}>
      {message || t("server-connection-error-page.body")}
    </Page>
  );
};

interface Props {
  message?: string;
}

export default ServerConnectionErrorPage;
