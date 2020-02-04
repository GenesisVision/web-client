import Page from "components/page/page";
import withDefaultLayout from "decorators/with-default-layout";
import { useTranslation } from "i18n";
import { NextPage } from "next";
import React from "react";

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
    <Page showTitle title={t("not-found-page.title")}>
      {message}
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
