import { connect } from "react-redux";
import React, { Component } from "react";
import TournamentTabs from "./tournament-tabs/tournament-tabs";

class TournamentTabsContainer extends Component {
  render() {
    const { type, handleFilterChange } = this.props;

    const onFilterChange = type => () => {
      handleFilterChange({ type });
    };
    return <TournamentTabs activeRound={1} onFilterChange={onFilterChange} />;
  }
}
const mapStateToProps = state => {
  const { type } = 1; //state.tournamentData.settings;
  return { type };
};

const mapDispatchToProps = dispatch => ({
  handleFilterChange: filter => {
    //dispatch(dashboardActions.updateFiltering(filter));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TournamentTabsContainer
);
