import Page from "components/page/page";
import React from "react";
import { useTranslation } from "react-i18next";

export const RatingPage: React.FC<Props> = () => {
  const [t] = useTranslation();
  const title = t(`Rating`);
  return <Page title={title}></Page>;
};

interface Props {}
