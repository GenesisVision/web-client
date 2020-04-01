import Page from "components/page/page";
import { RatingContainer } from "pages/rating/rating.container";
import React from "react";
import { useTranslation } from "react-i18next";

export const RatingPage: React.FC<Props> = () => {
  const [t] = useTranslation();
  const title = t(`Rating`);
  return (
    <Page title={title}>
      <RatingContainer />
    </Page>
  );
};

interface Props {}
