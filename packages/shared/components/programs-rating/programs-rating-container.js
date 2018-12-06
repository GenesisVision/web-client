import "shared/components/programs-rating/programs-rating.scss";

import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators, compose } from "redux";
import ProgramsRatingTables from "shared/components/programs-rating/programs-rating-tables";
import { getLevelUpSummary } from "shared/components/programs-rating/services/program-rating-service";
import Surface from "shared/components/surface/surface";
import TabsContainer from "shared/components/tabs-container/tabs-container";
import { translate } from "react-i18next";

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
        name: String(item.level),
        label: (
          <span className="programs-rating__tab-label">
            {item.level}
            <span className="programs-rating__tab-arrow">&rarr;</span>
            {++item.level}
            {item.totalOwn !== 0 && (
              <span className="programs-rating__tab-count">
                {item.totalOwn}
              </span>
            )}
          </span>
        )
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
    const { t, id, levelData, routes } = this.props;
    const { tab, navigateTabs } = this.state;

    if (!tab || !levelData || !navigateTabs) return null;
    return (
      <Surface className="programs-rating">
        <h3 className="programs-rating__head">{t("rating-page.title")}</h3>
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
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProgramsRatingContainer);
