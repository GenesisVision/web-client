import Page from "components/page/page";
import { UsersContainer } from "pages/social/users/users.container";
import React from "react";
import { useTranslation } from "react-i18next";

export const UsersPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page showTitle title={t("Users")} noFollow noIndex>
      <UsersContainer />
    </Page>
  );
};
