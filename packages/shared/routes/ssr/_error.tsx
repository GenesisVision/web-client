import { NextPage } from "next";
import React from "react";
import Page from "shared/components/page/page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { useTranslation } from "shared/i18n";

const Component: NextPage<ErrorPage> = ({ err, res }) => {
  const { t } = useTranslation();
  const errorCode = err ? err.statusCode : undefined;
  const statusCode = res ? res.statusCode : undefined;
  const code = errorCode || statusCode;
  const notFoundMessage = code === 404 && t("not-found-page.body");
  const errorMessage = err && err.message;
  const statusMessage = res && res.statusMessage;
  const message =
    notFoundMessage || errorMessage || statusMessage || "error...";
  return (
    <Page title={t("not-found-page.title")}>
      <div className="app__main-wrapper">{message}</div>
    </Page>
  );
};

Component.getInitialProps = async ({ res, err }) => ({
  res,
  err,
  namespacesRequired: ["translation"]
});

export const ErrorPage = withDefaultLayout(Component);

interface ErrorPage {
  res: any;
  err: any;
}
