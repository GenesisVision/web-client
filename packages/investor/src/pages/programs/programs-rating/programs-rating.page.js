import "shared/components/programs-rating/programs-rating.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";
import * as routes from "../programs.routes";
import { compose } from "redux";
import ProgramsRatingContainer from "shared/components/programs-rating/programs-rating-container";

class ProgramsRatingPage extends Component {
  render() {
    const { t } = this.props;
    return (
      <Page title={t("programs-page.title")}>
        <ProgramsRatingContainer routes={routes} />
      </Page>
    );
  }
}

export default compose(translate())(ProgramsRatingPage);
