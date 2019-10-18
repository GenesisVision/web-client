import { NextPage } from "next";
import React from "react";
import Page from "shared/components/page/page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { useTranslation } from "shared/i18n";

const Component: NextPage<IErrorPage> = ({
  code,
  statusMessage,
  errorMessage
}) => {
  const { t } = useTranslation();
  const notFoundMessage = code === 404 && t("not-found-page.body");
  const message =
    notFoundMessage || errorMessage || statusMessage || "error...";
  return (
    <Page title={t("not-found-page.title")}>
      <div className="app__main-wrapper">{message}</div>
    </Page>
  );
};

Component.getInitialProps = async ({ res, err }) => {
  const errorCode = err ? err.statusCode : undefined;
  const statusCode = res ? res.statusCode : undefined;
  const code = errorCode || statusCode || 200;
  const statusMessage = res ? res.statusMessage : undefined;
  const errorMessage = err ? err.message : undefined;

  return {
    code,
    statusMessage,
    errorMessage,
    namespacesRequired: ["translation"]
  };
};

export const ErrorPage = withDefaultLayout(Component);

interface IErrorPage {
  code: number;
  statusMessage?: string;
  errorMessage?: string;
}
