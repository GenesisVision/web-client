import "shared/components/programs-rating/programs-rating.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";
import * as routes from "../programs.routes";
import { compose } from "redux";
import connect from "react-redux/es/connect/connect";
import ProgramsRatingContainer from "shared/components/programs-rating/programs-rating-container";

class ProgramsRatingPage extends Component {
  render() {
    const { t, id } = this.props;
    if (!id) return null;
    return (
      <Page title={t("programs-page.title")}>
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
