import Page from "components/page/page";
import React from "react";
import { useTranslation } from "react-i18next";

export const SocialPage: React.FC = () => {
  const [t] = useTranslation();
  return <Page showTitle title={t("Social")}></Page>;
};
