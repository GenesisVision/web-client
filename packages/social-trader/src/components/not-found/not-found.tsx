import Page from "components/page/page";
import * as React from "react";
import { useTranslation } from "react-i18next";

const NotFoundPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page showTitle title={t("not-found-page.title")}>
      {t("not-found-page.body")}
    </Page>
  );
};

export default NotFoundPage;
