import { NextPage } from "next";
import React from "react";
import Page from "shared/components/page/page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { useTranslation } from "shared/i18n";

const Error: NextPage<ErrorPage> = ({ statusCode }) => {
  const { t } = useTranslation();
  if (statusCode === 404) {
    return (
      <Page title={t("not-found-page.title")}>
        <div className="app__main-wrapper">{t("not-found-page.body")}</div>
      </Page>
    );
  }
  return <p>error...</p>;
};

Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : undefined;

  return {
    statusCode,
    namespacesRequired: ["translation"]
  };
};

export default withDefaultLayout(Error);

interface ErrorPage {
  statusCode?: number;
}
