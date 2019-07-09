import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import Page from "shared/components/page/page";

const _NotFoundPage: React.FC<WithTranslation> = ({ t }) => (
  <Page title={t("not-found-page.title")}>
    <div className="app__main-wrapper">{t("not-found-page.body")}</div>
  </Page>
);

const NotFoundPage = translate()(_NotFoundPage);
export default NotFoundPage;
