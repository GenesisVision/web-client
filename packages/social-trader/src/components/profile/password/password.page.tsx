import Page from "components/page/page";
import PasswordChange from "modules/password-change/password-change";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _PasswordPage: React.FC<WithTranslation> = ({ t }) => (
  <Page showTitle title={t("auth:password-change.title")}>
    <PasswordChange />
  </Page>
);

const PasswordPage = translate()(React.memo(_PasswordPage));
export default PasswordPage;
