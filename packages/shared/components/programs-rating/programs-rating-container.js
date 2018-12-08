import "shared/components/programs-rating/programs-rating.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators, compose } from "redux";
import ProgramsRatingTables from "shared/components/programs-rating/programs-rating-tables";
import { getLevelUpSummary } from "shared/components/programs-rating/services/program-rating-service";
import Surface from "shared/components/surface/surface";
import TabsContainer from "shared/components/tabs-container/tabs-container";

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
          <div className="programs-rating__tab">
            <div className="programs-rating__tab-container">
              <div className="programs-rating__back">{item.level}</div>
              <div className="programs-rating__back-arrow">&rarr;</div>
              <div className="programs-rating__back">{item.level + 1}</div>
            </div>
            {item.totalOwn !== 0 && (
              <span className="programs-rating__tab-count">
                {item.totalOwn}
              </span>
            )}
          </div>
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
    const { t, id, levelData, routes, title } = this.props;
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
        <ProgramsRatingTables key={tab.level} tab={tab} id={id} title={title} />
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
