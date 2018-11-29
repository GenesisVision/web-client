import "shared/components/programs-rating/programs-rating.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";

import TabsContainer from "shared/components/tabs-container/tabs-container";
import * as routes from "../programs.routes";
import { bindActionCreators, compose } from "redux";
import ProgramsRatingTables from "shared/components/programs-rating/programs-rating-tables";
import { getLevelUpSummary } from "shared/components/programs-rating/services/program-rating-service";
import Surface from "shared/components/surface/surface";
import connect from "react-redux/es/connect/connect";
import { LEVELS } from "shared/components/programs-rating/programs-rating-table";

const TABS = ["1 > 2", "2 > 3", "3 > 4", "5 > 6", "7 > 8"];

class ProgramsRatingPage extends Component {
  state = {
    tab: TABS[0],
    level: LEVELS[TABS[0]]
  };

  componentDidMount() {
    const { match, service } = this.props;
    service.getLevelUpSummary();
    if (match.params.tab) {
      this.setState({
        tab: match.params.tab
      });

      if (LEVELS[this.state.tab])
        this.setState({
          level: LEVELS[this.state.tab]
        });
    }
  }
  handleTabChange = (e, tab) => {
    this.setState({ tab, level: LEVELS[tab] });
  };
  render() {
    const { t, levelData } = this.props;
    const { tab, level } = this.state;
    console.log(levelData);
    const currentLevelData = levelData ? levelData[level] : null;
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
              levelData={levelData}
            />
          </div>
          <ProgramsRatingTables
            key={tab}
            tab={tab}
            levelData={currentLevelData}
          />
        </Surface>
      </Page>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  const levelData = state.programsRating.levelupSummary.data
    ? state.programsRating.levelupSummary.data
    : null;
  return levelData;
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ getLevelUpSummary }, dispatch)
});

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProgramsRatingPage);
