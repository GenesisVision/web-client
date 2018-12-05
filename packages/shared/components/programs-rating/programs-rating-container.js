import "shared/components/programs-rating/programs-rating.scss";

import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators, compose } from "redux";
import ProgramsRatingTables from "shared/components/programs-rating/programs-rating-tables";
import { getLevelUpSummary } from "shared/components/programs-rating/services/program-rating-service";
import Surface from "shared/components/surface/surface";
import TabsContainer from "shared/components/tabs-container/tabs-container";

import { LEVELS } from "./program-rating.constants";
import { setArrow } from "./program-rating.helper";

class ProgramsRatingContainer extends Component {
  state = {
    tab: null,
    navigateTabs: null
  };

  componentDidMount() {
    const { service } = this.props;
    service.getLevelUpSummary().then(res => {
      const { levelData } = res.value;
      const navigateTabs = levelData.map(item => ({
        ...item,
        count: item.totalOwn,
        name: setArrow(LEVELS[item.level])
      }));
      const tab = navigateTabs[0];
      this.setState({ navigateTabs, tab });
    });
  }

  handleTabChange = (e, tab) => {
    const { navigateTabs } = this.state;
    this.setState({ tab: navigateTabs.find(item => item.name === tab) });
  };

  render() {
    const { id, levelData, routes } = this.props;
    const { tab, navigateTabs } = this.state;

    if (!tab || !levelData || !navigateTabs) return null;
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
        <ProgramsRatingTables key={tab.level} tab={tab} id={id} />
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
