import "shared/components/programs-rating/programs-rating.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import Page from "shared/components/page/page";
import ProgramsRatingContainer from "shared/components/programs-rating/programs-rating-container";

const _ProgramsRatingPage: React.FC<InjectedTranslateProps> = ({ t }) => (
  <Page title={t("rating-page.title")}>
    <ProgramsRatingContainer title={t("rating-page.title")} />
  </Page>
);

const ProgramsRatingPage = compose<React.ComponentType>(
  React.memo,
  translate()
)(_ProgramsRatingPage);
export default ProgramsRatingPage;
