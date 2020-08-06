import Page from "components/page/page";
import PasswordChange from "modules/password-change/password-change";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _PasswordPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page showTitle title={t("auth:password-change.title")}>
      <PasswordChange />
    </Page>
  );
};

const PasswordPage = React.memo(_PasswordPage);
export default PasswordPage;
