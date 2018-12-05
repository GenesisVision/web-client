import "shared/components/programs-rating/programs-rating.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { compose } from "redux";
import Page from "shared/components/page/page";
import ProgramsRatingContainer from "shared/components/programs-rating/programs-rating-container";

import * as routes from "../programs.routes";

class ProgramsRatingPage extends Component {
  render() {
    const { t, id } = this.props;
    return (
      <Page title={t("rating.title")}>
        <ProgramsRatingContainer routes={routes} id={id} />
      </Page>
    );
  }
}

const mapStateToProps = state => {
  const { data } = state.profileHeader.info;
  if (!data) return {};
  return { id: data.id };
};

export default compose(
  translate(),
  connect(mapStateToProps)
)(ProgramsRatingPage);
