import Page from "components/page/page";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _NotFoundPage: React.FC<WithTranslation> = ({ t }) => (
  <Page showTitle title={t("not-found-page.title")}>
    {t("not-found-page.body")}
  </Page>
);

const NotFoundPage = translate()(_NotFoundPage);
export default NotFoundPage;
