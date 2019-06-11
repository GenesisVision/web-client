import "shared/components/programs-rating/programs-rating.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import Page from "shared/components/page/page";
import ProgramsRatingContainer from "shared/components/programs-rating/programs-rating-container";
import { RootState } from "shared/reducers/root-reducer";

const _ProgramsRatingPage: React.FC<Props> = ({ t, id }) => (
  <Page title={t("rating-page.title")}>
    <ProgramsRatingContainer id={id} title={t("rating-page.title")} />
  </Page>
);

const mapStateToProps = (state: RootState): StateProps => {
  const { data } = state.profileHeader;
  if (!data) return {};
  return { id: data.id };
};

interface Props extends InjectedTranslateProps, StateProps, OwnProps {}

interface StateProps {
  id?: string;
}
interface OwnProps {}

const ProgramsRatingPage = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(mapStateToProps)
)(_ProgramsRatingPage);
export default ProgramsRatingPage;
