import "shared/components/programs-rating/programs-rating.scss";

import React, { Component } from "react";

import TabsContainer from "shared/components/tabs-container/tabs-container";
import { bindActionCreators, compose } from "redux";
import connect from "react-redux/es/connect/connect";
import ProgramsRatingTables from "shared/components/programs-rating/programs-rating-tables";
import Surface from "shared/components/surface/surface";
import { getLevelUpSummary } from "shared/components/programs-rating/services/program-rating-service";
import { LEVELS } from "./program-rating.constants";

class ProgramsRatingContainer extends Component {
  state = {
    tab: null,
    navigateTabs: null
  };

  componentDidMount() {
    const { service } = this.props;
    service.getLevelUpSummary().then(res => {
      const { levelData } = res.value;
      const navigateTabs = Object.keys(levelData)
        .filter(tab => LEVELS[tab])
        .map(tab => ({
          level: tab,
          name: LEVELS[tab],
          count: levelData[tab].totalOwn
        }));
      const tab = navigateTabs[0];
      this.setState({ navigateTabs, tab });
    });
  }
  handleTabChange = (e, tab) => {
    const { navigateTabs } = this.state;
    const navigateTab = navigateTabs.find(item => item.name === tab);
    this.setState({ tab: navigateTab });
  };
  render() {
    const { id, levelData, routes } = this.props;
    const { tab, navigateTabs } = this.state;

    if (!tab || !levelData || !navigateTabs) return null;
    const currentLevelData = levelData[tab.level];
    return (
      <Surface className="programs-rating">
        <div className="programs-rating__tabs">
          <TabsContainer
            programFacetRoute={routes.PROGRAMS_RATING_TAB_ROUTE}
            tabs={navigateTabs}
            handleTabChange={this.handleTabChange}
            tab={tab}
            levelData={levelData}
          />
        </div>
        <ProgramsRatingTables
          key={tab.level}
          tab={tab.level}
          id={id}
          levelData={currentLevelData}
        />
      </Surface>
    );
  }
}

const mapStateToProps = state => {
  const { levelupSummary } = state.programsRating;
  if (!levelupSummary.data) return {};
  return { levelData: levelupSummary.data.levelData };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ getLevelUpSummary }, dispatch)
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProgramsRatingContainer);
