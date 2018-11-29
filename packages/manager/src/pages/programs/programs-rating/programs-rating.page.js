import "shared/components/programs-rating/programs-rating.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";

import TabsContainer from "shared/components/tabs-container/tabs-container";
import * as routes from "../programs.routes";
import { compose } from "redux";
import connect from "react-redux/es/connect/connect";
import ProgramsRatingTables from "shared/components/programs-rating/programs-rating-tables";
import Surface from "shared/components/surface/surface";

const TABS = ["1 > 2", "2 > 3", "3 > 4", "5 > 6", "7 > 8"];

const rating = {
  programCounts: "120",
  quota: "12",
  currentProfit: "24.54675"
};

class ProgramsRatingPage extends Component {
  state = {
    tab: TABS[0]
  };

  componentDidMount() {
    const { match } = this.props;
    if (match.params.tab) this.setState({ tab: match.params.tab });
  }
  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };
  render() {
    const { t, id } = this.props;
    const { tab } = this.state;
    if (!tab) return null;
    return (
      <Page title={t("programs-page.title")}>
        <Surface className="programs-rating">
          <div className="programs-rating__tabs">
            <TabsContainer
              programFacetRoute={routes.PROGRAMS_RATING_TAB_ROUTE}
              tabs={TABS}
              handleTabChange={this.handleTabChange}
              tab={tab}
            />
          </div>
          <ProgramsRatingTables
            manager
            key={tab}
            tab={tab}
            id={id}
            rating={rating}
          />
        </Surface>
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
