import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import Page from "shared/components/page/page";

const NotFoundPage: React.FC<InjectedTranslateProps> = ({ t }) => (
  <Page title={t("not-found-page.title")}>
    <div className="app__main-wrapper">{t("not-found-page.body")}</div>
  </Page>
);

export default translate()(NotFoundPage);
