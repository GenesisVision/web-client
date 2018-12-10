import "shared/components/programs-rating/programs-rating.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import Page from "shared/components/page/page";
import ProgramsRatingContainer from "shared/components/programs-rating/programs-rating-container";

import * as routes from "../programs.routes";

class ProgramsRatingPage extends Component {
  render() {
    const { t } = this.props;
    const title = t("rating-page.title");
    return (
      <Page title={title}>
        <ProgramsRatingContainer routes={routes} title={title} />
      </Page>
    );
  }
}

export default compose(translate())(ProgramsRatingPage);
